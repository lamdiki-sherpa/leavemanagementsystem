const mongoose= require('mongoose')

const LeaveSchema =new mongoose.Schema({
      LeaveType: {
        type: String,
        enum:["Bereavement", "Paternity", "Maternity","Sick", "Unpaid", "Compensatory","Religious", "Annual"],
        required: true
      },
      Priority: {
        type: String,
        enum: ['High','Medium', 'Low'],
        default: 'Low'
      },
      LeaveDetails: {
        type: String,
      },
      StartLeaveDate: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      EndLeaveDate: {
        type: Date,
        required: true,
      },
      AdminRemark: {
        type: String,
        default: "",
      },
      AdminStatus: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending",
      },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    },

   
},{timestamps:true})

module.exports = mongoose.model('Job',LeaveSchema)
const createLeave=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const leave = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({leave})
}