const mongoose = require("mongoose");

const LeaveTypeSchema = new mongoose.Schema({
  LeaveTypeName: {
    type: String,
    required: true,
  },
  LeaveTypeDetails: {
    type: String,
  },
  LeavePerYear: {
    type: Number,
  },
  LeavePriority: {
    type: Number,
    default: 1,
    enum: [1, 2, 3],
  },
});

module.exports = mongoose.model("LeaveType", LeaveTypeSchema);
