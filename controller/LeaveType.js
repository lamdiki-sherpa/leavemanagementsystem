const LeaveType=require('../models/LeaveType')
const {BadRequestError,NotFoundError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const getAllLeaveTypes=async(req,res)=>{
const leaveTypes = await LeaveType.find()
res.status(StatusCodes.OK).json({leaveTypes,count:leaveTypes.length})
}
const getLeaveType=async(req,res)=>{
    const {params:{id:leaveTypeId}}=req
    const leaveType = await LeaveType.findOne({
        _id:leaveTypeId
    })
    if(!leaveType){
        throw new NotFoundError(`No  leaveType with id ${leaveTypeId}`)
    }
    res.status(StatusCodes.OK).json({leaveType})
}
const createLeaveType=async(req,res)=>{
    // req.body.createdBy=req.user.userId
    const leaveType= await LeaveType.create(req.body)
    res.status(StatusCodes.CREATED).json({leaveType})
}
const updateLeaveType=async(req,res)=>{
    const {body:{LeaveTypeName,LeaveTypeDetails,LeavePerYear,LeavePriority},params:{id:leaveTypeId}}=req
    if(LeaveTypeName==="" || LeaveTypeDetails===""|| LeavePerYear==="" || LeavePriority===""){
        throw new BadRequestError('Fields cannot be empty ')
    }
    const leaveType= await LeaveType.findByIdAndUpdate({_id:leaveTypeId},req.body,{new:true,runValidators:true})
    if(!leaveType){
        throw new NotFoundError(`No  LeaveType with id ${leaveTypeId}`)
    }
    res.status(StatusCodes.OK).json({leaveType})

}
const deleteLeaveType=async(req,res)=>{
    const {params:{id:leaveTypeId}}=req
    const leaveType= await LeaveType.findByIdAndRemove({_id:leaveTypeId})
    if(!leaveType){
        throw new NotFoundError(`No  LeaveType with id ${leaveTypeId}`)
    }
    res.status(StatusCodes.OK).send()
}
module.exports={updateLeaveType,getAllLeaveTypes,getLeaveType,createLeaveType,deleteLeaveType}





