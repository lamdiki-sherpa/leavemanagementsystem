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
    const leaveType=req.body.LeaveType
    // console.log(req.body.LeaveType)
    if(leaveType==="Sick"){
        req.body.leavePriority=4
    }
    else if(leaveType==="Bereavement"){
    req.body.leavePriority=1
    }
    else if(leaveType==="Maternity"){
    req.body.leavePriority=2
        }
    else if(leaveType==="Paternity"){
    req.body.leavePriority=3
            }
    else if(leaveType==="Annual"){
     req.body.leavePriority=5
    }
    else if(leaveType==="Religious"){
        req.body.leavePriority=6
       }
    else if(leaveType==="Unpaid"){
        req.body.leavePriority=7
       }
     else if(leaveType==="Compensatory"){
        req.body.leavePriority=8
       }
       else{
        req.body.leavePriority=9
       }
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