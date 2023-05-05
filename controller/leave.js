const Job = require("../models/leave");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllLeaves = async (req, res) => {
  const leaves = await Job.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
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
  const diffInDay = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  console.log(diffInDay);
  const leaveType = req.body.LeaveType; // cron.schedule('* * * * *', async () => { //     await autoRejectLeaveRequests(); //   });
  if (leaveType === "Sick") {
    req.body.leavePriority = 4;
    req.body.AvailableLeaveDay = 7;
  } else if (leaveType === "Bereavement") {
    req.body.leavePriority = 1;
    req.body.AvailableLeaveDay = 13;
  } else if (leaveType === "Maternity") {
    req.body.leavePriority = 2;
    req.body.AvailableLeaveDay = 60;
  } else if (leaveType === "Paternity") {
    req.body.leavePriority = 3;
    req.body.AvailableLeaveDay = 15;
  } else if (leaveType === "Annual") {
    req.body.leavePriority = 5;
    req.body.AvailableLeaveDay = 12;
  } else if (leaveType === "Religious") {
    req.body.leavePriority = 6;
    req.body.AvailableLeaveDay = 5;
  } else if (leaveType === "Unpaid") {
    req.body.leavePriority = 7;
    req.body.AvailableLeaveDay = 7;
  } else if (leaveType === "Compensatory") {
    req.body.leavePriority = 8;
    req.body.AvailableLeaveDay = 30;
  } else {
    req.body.leavePriority = 9;
  }
  const daysavailable = req.body.AvailableLeaveDay - diffInDay;
  req.body.leaveScore = daysavailable * req.body.leavePriority;
  console.log(req.body.leaveScore);
  req.body.AvailableLeaveDay = daysavailable;
  const leave = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ leave });
};

const updateLeave = async (req, res) => {
  const {
    body: { LeaveType, StartLeaveDate, EndLeaveDate },
    user: { userId },
    params: { id: leaveId },
  } = req;
  if (LeaveType === "" || StartLeaveDate === "" || EndLeaveDate === "") {
    throw new BadRequestError("Fields cannot be empty ");
  }
  const leave = await Job.findByIdAndUpdate(
    { _id: leaveId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!leave) {
    throw new NotFoundError(`No  job with id ${leaveId}`);
  }
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
  updateLeave,
  deleteLeave,
  createLeave,
  autoRejectLeaveRequests,
};
