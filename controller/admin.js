const Job=require('../models/leave')
const {StatusCodes}=require('http-status-codes')
const getAllLeaveByAdmin=async(req,res)=>{
    const leaves= await Job.find()
    res.status(StatusCodes.OK).json({leaves,count:leaves.length})
}

module.exports={getAllLeaveByAdmin}