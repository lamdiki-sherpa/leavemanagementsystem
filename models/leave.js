const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    LeaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
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
    AdminRemark: {
      type: String,
      default: "",
    },
    AdminStatus: {
      type: String,
      enum: ["Pending", "Rejected", "Approved"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    leavePriority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3]
    },
    AvailableLeaveDay: {
      type: Number,
      default: 0,
    },
    leaveScore: {
      type: Number,
      default: 0,
    },
    AvailableLeaveDayUpdatedAt: { 
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", LeaveSchema);
