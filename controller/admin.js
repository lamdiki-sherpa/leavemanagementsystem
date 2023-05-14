const Job = require("../models/leave");
const { StatusCodes } = require("http-status-codes");
const getAllLeaveByAdmin = async (req, res) => {
  const leaves = await Job.find().populate("createdBy").sort("leavePriority");
  res.status(StatusCodes.OK).json({ leaves, count: leaves.length });
};

const getSingleLeaveByAdmin = async (req, res) => {
  console.log(req.params.id);
  const {
    params: { id: leaveId },
  } = req;
  const leave = await Job.findOne({
    _id: leaveId,
  }).populate("createdBy");
  if (!leave) {
    throw new NotFoundError(`No  leave with id ${leaveId}`);
  }
  res.status(StatusCodes.OK).json({ leave });
};
// const deleteLeaveByAdmin=async()=>{
//     const {params:{id:leaveId}}=req
//     const leave= await Job.findByIdAndRemove({_id:leaveId})
//     if(!leave){
//         throw new NotFoundError(`No  job with id ${leaveId}`)
//     }    
//     res.status(StatusCodes.OK).send(

//     )
// }
const updateLeaveByAdmin = async (req, res) => {
  const {
    body: { AdminRemark, AdminStatus },
    params: { id: leaveId },
  } = req;
  if (AdminRemark === "" || AdminStatus === "") {
    throw new BadRequestError("Fields cannot be empty ");
  }
  const leave = await Job.findByIdAndUpdate({ _id: leaveId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!leave) {
    throw new NotFoundError(`No  job with id ${leaveId}`);
  }
  res.status(StatusCodes.OK).json({ leave });
};

module.exports = {
  getAllLeaveByAdmin,
  getSingleLeaveByAdmin,
  updateLeaveByAdmin,
};
