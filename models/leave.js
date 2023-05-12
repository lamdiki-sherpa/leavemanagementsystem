const mongoose= require('mongoose')

const LeaveSchema =new mongoose.Schema({
    LeaveType:{
        type:String,
        // enum:["Bereavement", "Paternity", "Maternity","Sick", "Unpaid", "Compensatory","Religious", "Annual"],
        required:true,
    },
    priority: {
      type: String,
      enum: ['High','Medium', 'Low'],
      default: 'Low'
    },
    // leaveTypes: [{
    //   leaveType: {
    //     type: String,
    //     // enum:["Bereavement", "Paternity", "Maternity","Sick", "Unpaid", "Compensatory","Religious", "Annual"],
    //     required: true
    //   },
    //   priority: {
    //     type: String,
    //     enum: ['High','Medium', 'Low'],
    //     default: 'Low'
    //   }
    // }],
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
    leavePriority:{
     type:Number,
     default:0
    },
    AvailableLeaveDay:{
      type:Number,
      default:0
    },
    leaveScore:{
      type:Number,
      default:0
    },
    leaveStatus:{
      type:Boolean,
      default:false
    }
   
},{timestamps:true})

module.exports = mongoose.model('Job',LeaveSchema)