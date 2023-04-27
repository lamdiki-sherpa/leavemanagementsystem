const Job=require('../models/leave')
const {BadRequestError,NotFoundError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const getAllLeaves=async(req,res)=>{
const leaves = await Job.find({createdBy:req.user.userId}).sort('createdAt')
res.status(StatusCodes.OK).json({leaves,count:leaves.length})
}

const getLeave=async(req,res)=>{
    const {user:{userId},params:{id:leaveId}}=req
    const leave = await Job.findOne({
        _id:leaveId,createdBy:userId
    })
    if(!leave){
        throw new NotFoundError(`No  leave with id ${leaveId}`)
    }
    res.status(StatusCodes.OK).json({leave})
}
const createLeave=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const leave = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({leave})
}
const updateLeave=async(req,res)=>{
    const {body:{LeaveType,StartLeaveDate,EndLeaveDate},user:{userId},params:{id:leaveId}}=req
    if(LeaveType==="" || StartLeaveDate==="" || EndLeaveDate===""){
        throw new BadRequestError('Fields cannot be empty ')
    }
    const leave= await Job.findByIdAndUpdate({_id:leaveId,createdBy:userId},req.body,{new:true,runValidators:true})
    if(!leave){
        throw new NotFoundError(`No  job with id ${leaveId}`)
    }
    res.status(StatusCodes.OK).json({leave})

}
const deleteLeave=async(req,res)=>{
    const {user:{userId},params:{id:leaveId}}=req
    const leave= await Job.findByIdAndRemove({_id:leaveId,createdBy:userId})
    if(!leave){
        throw new NotFoundError(`No  job with id ${leaveId}`)
    }
    res.status(StatusCodes.OK).send(
        
    )
}
module.exports={getAllLeaves,getLeave,updateLeave,deleteLeave,createLeave}