const mongoose = require("mongoose");

const DepartmentSchema =new mongoose.Schema(
  {
    DepartmentName: {
      type: String,
      required: true,
      unique: true,
    },
    // DepartmentShortName: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    DepartmentDetails: {
      type: String,
    },
    DepartmentStatus: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Department',DepartmentSchema)