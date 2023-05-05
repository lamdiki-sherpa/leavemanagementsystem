const mongoose = require("mongoose");

const LeaveTypeSchema = new mongoose.Schema(
    {
        LeaveTypeName: {
          type: String,
          required: true,
        },
        LeaveTypeDetails: {
          type: String,
        },
        LeavePerYear:{
          type:Number
        },
        LeavePriority:{
          type:Number,
          default:0
        },
        
      
      },
  );

module.exports = mongoose.model('LeaveType',LeaveTypeSchema)