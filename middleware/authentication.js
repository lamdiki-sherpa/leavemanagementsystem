const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const { UnauthenticatedError } = require("../errors");
const { ROLES } = require("../constant");
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid!No token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
const CheckAdminAuth = async (req, res, next) => {
  try {
    const { email } = req.user;

    const admin = await User.aggregate([
      {
        $match: {
          $and: [{ email: email }, { roles: ROLES.ADMIN }],
        },
      },
    ]);

    if (!admin.length > 0) {
      throw CreateError("Invalid Credentials", 401);
    }
    console.log(admin, "admin");
    req.user.roles = admin[0].roles;
    next();
  } catch (e) {
    res.status(401).json({ message: "Access denied! Admin route." });
  }
};

module.exports = { authenticateUser, CheckAdminAuth };
