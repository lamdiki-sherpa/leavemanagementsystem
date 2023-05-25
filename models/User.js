const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  // DepartmentId: {
  //     type: mongoose.Types.ObjectId,
  //     ref: "Department",
  //     required: true,
  //   },
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  // email:{
  //     type:String,
  //     required:[true,'please provide email'],
  //     match: [
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //         'Please provide a valid email',
  //       ],
  //     unique:true,
  // },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (prop) => `Invalid Email Address: ${prop.value}`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
  roles: {
    type: String,
    enum: ["STAFF", "ADMIN"],
    default: "STAFF",
  },
  profile: {
    type: String,
  },
  salary: {
    type: Number,
    default: 0,
  },
  department:{
    type:String
  }
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email,roles: this.roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
