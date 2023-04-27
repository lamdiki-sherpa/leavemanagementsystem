const mongoose= require('mongoose')

const LeaveSchema =new mongoose.Schema({
    // LeaveType: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "LeaveType",
    //     required: true,
    //   },
    LeaveType:{

        type:String,
         required:true,
    },
      LeaveDetails: {
        type: String,
      },
      StartLeaveDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
      EndLeaveDate: {
        type: Date,
        required: true,
      },
    //   NumOfDay: {
    //     type: Number,
    //     required: true,
    //   },
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
    }
},{timestamps:true})

module.exports = mongoose.model('Job',LeaveSchema)