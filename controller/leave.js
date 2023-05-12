const Job=require('../models/leave')
const cron=require('node-cron')
const {BadRequestError,NotFoundError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const autoRejectLeaveRequests = async () => {
  // Get all leave requests that are currently pending
  const pendingRequests = await Job.find({ AdminStatus: 'Pending' });





  
  // Iterate over the pending leave requests
  pendingRequests.forEach(async (request) => {
    // Calculate the time difference between the current time and the time the request was submitted
    const now = new Date();
    // const timeDiff = now - request.StartLeaveDate;
    const timeDiff = now - request.createdAt;
    // If the request has been pending for more than two days (in milliseconds)
    
//    if (timeDiff > 2 * 60 * 1000)
    if(timeDiff>2*24*60*60*1000)
     {
      // Update the status of the request to "rejected"
      request.AdminStatus = 'Rejected';
     
      // Save the updated request to the database
      await request.save();
    }
  });
};

const getAllLeaves=async(req,res)=>{
const leaves = await Job.find({createdBy:req.user.userId}).populate('createdBy')
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
    req.body.leaveStatus=true
    const start=new Date(req.body.StartLeaveDate).getTime() 
    const end=new Date(req.body.EndLeaveDate).getTime() 
    const diffInMs=end-start
    const diffInDay=Math.floor(diffInMs/(1000 * 60 * 60 * 24))
    // console.log(diffInDay);
    const leaveType=req.body.LeaveType
    console.log(leaveType)
   if(leaveType==="Sick"){
        req.body.leavePriority=4
        req.body.AvailableLeaveDay=7
    }
    else if(leaveType==="Bereavement"){
    req.body.leavePriority=1
    req.body.AvailableLeaveDay=13
    }
    // else if(leaveType==="Maternity"){
    // req.body.leavePriority=2
    // req.body.AvailableLeaveDay=60
    //     }
    // else if(leaveType==="Paternity"){
    // req.body.leavePriority=3
    // req.body.AvailableLeaveDay=15
    //         }
    // else if(leaveType==="Annual"){
    //  req.body.leavePriority=5
    //  req.body.AvailableLeaveDay=12
    // }
    // else if(leaveType==="Religious"){
    //     req.body.leavePriority=6
    //     req.body.AvailableLeaveDay=5
    //    }
    // else if(leaveType==="Unpaid"){
    //     req.body.leavePriority=7
    //     req.body.AvailableLeaveDay=7
    //    }
    //  else if(leaveType==="Compensatory"){
    //     req.body.leavePriority=8
    //     req.body.AvailableLeaveDay=30
    //    }
       else{
        req.body.leavePriority=9
    
       }
    const daysavailable=req.body.AvailableLeaveDay-diffInDay
    req.body.leaveScore=daysavailable*req.body.leavePriority
    
  
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

module.exports={getAllLeaves,getLeave,updateLeave,deleteLeave,createLeave,autoRejectLeaveRequests }