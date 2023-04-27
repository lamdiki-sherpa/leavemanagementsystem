const mongoose = require("mongoose");

const LeaveTypeSchema = new mongoose.Schema(
    {
        LeaveTypeName: {
          type: String,
          required: true,
          unique: true,
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
        }
        // LeaveTypeStatus: {
        //   type: Boolean,
        //   required: true,
        // },
      },
  );

module.exports = mongoose.model('LeaveType',LeaveTypeSchema)