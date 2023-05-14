const Job = require("../models/leave");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const LeaveType = require("../models/LeaveType");
const { default: mongoose, isValidObjectId } = require("mongoose");
const { query } = require("express");
const moment = require("moment");
const { ROLES } = require("../constant");

const getAllLeaves = async (req, res) => {
  req.query.order = req.query.order === "ASC" ? 1 : -1;
  req.query.AdminStatus = req.query.AdminStatus
    ? req.query.AdminStatus
    : req.user.roles === ROLES.ADMIN
    ? "Pending"
    : "Approved";
  req.query.sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let sortReq = {};
  if (req.query.sortBy) {
    sortReq[req.query.sortBy] = req.query.order;
  }
  let matchReq = { AdminStatus: req.query.AdminStatus };
  let leaveTypeReq = {};
  if (req.user.roles !== ROLES.ADMIN) {
    matchReq["createdBy"] = mongoose.Types.ObjectId(req.user.userId);
  }

  // to filter based on leave priority of user leave application
  if (req.query.leavePriority) {
    matchReq["leavePriority"] = +req.query.leavePriority;
  }

  // to filter based on leaveType leave priority
  if (req.query.leaveTypePriority) {
    leaveTypeReq["leavetypes.leavePriority"] = +req.query.leaveTypePriority;
  }
  if (req.query.LeaveType) {
    if (isValidObjectId(req.query.LeaveType)) {
      matchReq["LeaveType"] = mongoose.Types.ObjectId(req.query.LeaveType);
    } else {
      // if leavetype is of invalid objectid,  return empty array
      res.status(StatusCodes.OK).json({ leaves: [], count: 0 });
    }
  }

  // startDate and endDate filter
  if (req.query.startDate && req.query.endDate) {
    var today = new Date(
      moment(req.query.startDate).startOf("day").toISOString()
    );
    // "2018-12-05T00:00:00.00
    var tomorrow = new Date(
      moment(req.query.endDate).endOf("day").toISOString()
    );
    matchReq = {
      ...matchReq,
      $and: [
        { StartLeaveDate: { $gt: new Date(today) } },
        { EndLeaveDate: { $lt: new Date(tomorrow) } },
      ],
    };
  }
  const leaves = await Job.aggregate([
    {
      $match: matchReq,
    },
    {
      $lookup: {
        from: "leavetypes",
        localField: "LeaveType",
        foreignField: "_id",
        as: "leavetypes",
      },
    },
    {
      $match: leaveTypeReq,
    },
    { $sort: sortReq },
  ]);
  res.status(StatusCodes.OK).json({ leaves, count: leaves.length });
};

const getLeave = async (req, res) => {
  const {
    user: { userId },
    params: { id: leaveId },
  } = req;
  const leave = await Job.findOne({
    _id: leaveId,
    createdBy: userId,
  });
  if (!leave) {
    throw new NotFoundError(`No  leave with id ${leaveId}`);
  }
  res.status(StatusCodes.OK).json({ leave });
};
// const createLeave=async(req,res)=>{
//     req.body.createdBy=req.user.userId
//     const leaveType=req.body.LeaveType
//     // console.log(req.body.LeaveType)
//     if(leaveType==="Sick"){
//         req.body.leavePriority=4
//     }
//     else if(leaveType==="Bereavement"){
//     req.body.leavePriority=1
//     }
//     else if(leaveType==="Maternity"){
//     req.body.leavePriority=2
//         }
//     else if(leaveType==="Paternity"){
//     req.body.leavePriority=3
//             }
//     else if(leaveType==="Annual"){
//      req.body.leavePriority=5
//     }
//     else if(leaveType==="Religious"){
//         req.body.leavePriority=6
//        }
//     else if(leaveType==="Unpaid"){
//         req.body.leavePriority=7
//        }
//      else if(leaveType==="Compensatory"){
//         req.body.leavePriority=8
//        }
//        else{
//         req.body.leavePriority=9
//        }
//     const leave = await Job.create(req.body)
//     res.status(StatusCodes.CREATED).json({leave})
// }

const autoRejectLeaveRequests = async () => {
  const pendingRequests = await Job.find({ AdminStatus: "Pending" });

  pendingRequests.forEach(async (request) => {
    const now = new Date();
    const timeDiff = now - request.createdAt;
    if (timeDiff > 2 * 24 * 60 * 60 * 1000) {
      request.AdminStatus = "Rejected";
      await request.save();
    }
  });
};

const createLeave = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const start = new Date(req.body.StartLeaveDate).getTime();
  const end = new Date(req.body.EndLeaveDate).getTime();
  const diffInMs = end - start;
  // if startdate is greater than end date, we will throw error, as it can cause security and logical issue
  if (end < start) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "StartDate exceeds EndDate" });
  }
  const diffInDay = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const leaveType = await LeaveType.findById(req.body.LeaveType);
  const previousLeaveRecord = await Job.findOne({
    createdBy: req.user.userId,
    LeaveType: req.body.LeaveType,
  });
  // if  we find, we will check if alredy exits then  we will calculate remainingdays left and update in database.
  //else we didn't find any previous leave records of this user with particular leave type, we will update the available days
  if (previousLeaveRecord) {
    const remainingDays = +previousLeaveRecord.AvailableLeaveDay - +diffInDay;
    if (remainingDays < 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "leave exceeds available days." });
    }
    const resp = await Job.findByIdAndUpdate(
      previousLeaveRecord._id,
      {
        // $inc: {
        //   AvailableLeaveDay: -diffInDay,
        //   leaveScore: +diffInDay * req.body.leavePriority,
        // },
        $set: {
          EndLeaveDate: req.body.EndLeaveDate,
          StartLeaveDate: req.body.StartLeaveDate,
        },
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(resp);
  } else {
    // const remainingDays = +leaveType.LeavePerYear - +diffInDay;
    console.log(remainingDays);
    if (remainingDays < 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Leave days exceed" });
    }
    req.body.AvailableLeaveDay = leaveType.LeavePerYear;
    // req.body.leaveScore = remainingDays * req.body.leavePriority;

    const resp = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(resp);
  }
};

const approveLeave = async (req, res) => {
  const {
    params: { id: leaveId },
  } = req;
  const previousLeaveRecord = await Job.findById(leaveId);
  if (!previousLeaveRecord) {
    throw new NotFoundError(`No  job with id ${leaveId}`);
  }
  const start = new Date(previousLeaveRecord.StartLeaveDate).getTime();
  const end = new Date(previousLeaveRecord.EndLeaveDate).getTime();
  const diffInMs = end - start;
  const diffInDay = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const leave = await Job.findByIdAndUpdate(
    previousLeaveRecord._id,
    {
      $inc: {
        AvailableLeaveDay: -diffInDay,
        leaveScore: +diffInDay * previousLeaveRecord.leavePriority,
      },
      $set: {
        EndLeaveDate: previousLeaveRecord.EndLeaveDate,
        StartLeaveDate: previousLeaveRecord.StartLeaveDate,
        AdminStatus: "Approved",
        AdminRemark: req.body.AdminRemark,
      },
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ leave });
};
const rejectLeave = async (req, res) => {
  const {
    params: { id: leaveId },
  } = req;
  const previousLeaveRecord = await Job.findById(leaveId);
  if (!previousLeaveRecord) {
    throw new NotFoundError(`No  job with id ${leaveId}`);
  }

  const leave = await Job.findByIdAndUpdate(
    previousLeaveRecord._id,
    {
      $set: {
        AdminStatus: "Rejected",
        AdminRemark: req.body.AdminRemark,
      },
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ leave });
};
const deleteLeave = async (req, res) => {
  const {
    user: { userId },
    params: { id: leaveId },
  } = req;
  const leave = await Job.findByIdAndRemove({
    _id: leaveId,
    createdBy: userId,
  });
  if (!leave) {
    throw new NotFoundError(`No  job with id ${leaveId}`);
  }
  res.status(StatusCodes.OK).send();
};
module.exports = {
  getAllLeaves,
  getLeave,
  rejectLeave,
  approveLeave,
  deleteLeave,
  createLeave,
  autoRejectLeaveRequests,
};

// const leaveType = req.body.LeaveType; // cron.schedule('* * * * *', async () => { //     await autoRejectLeaveRequests(); //   });
// if (leaveType === "Sick") {
//   req.body.leavePriority = 4;
//   req.body.AvailableLeaveDay = 7;
// } else if (leaveType === "Bereavement") {
//   req.body.leavePriority = 1;
//   req.body.AvailableLeaveDay = 13;
// } else if (leaveType === "Maternity") {
//   req.body.leavePriority = 2;
//   req.body.AvailableLeaveDay = 60;
// } else if (leaveType === "Paternity") {
//   req.body.leavePriority = 3;
//   req.body.AvailableLeaveDay = 15;
// } else if (leaveType === "Annual") {
//   req.body.leavePriority = 5;
//   req.body.AvailableLeaveDay = 12;
// } else if (leaveType === "Religious") {
//   req.body.leavePriority = 6;
//   req.body.AvailableLeaveDay = 5;
// } else if (leaveType === "Unpaid") {
//   req.body.leavePriority = 7;
//   req.body.AvailableLeaveDay = 7;
// } else if (leaveType === "Compensatory") {
//   req.body.leavePriority = 8;
//   req.body.AvailableLeaveDay = 30;
// } else {
//   req.body.leavePriority = 9;
// }
// const daysavailable = req.body.AvailableLeaveDay - diffInDay;
// req.body.leaveScore = daysavailable * req.body.leavePriority;
// console.log(req.body.leaveScore);
// req.body.AvailableLeaveDay = daysavailable;
