require("dotenv").config();
require("express-async-errors");
const {ROLES}=require('./constant')
//extra security packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const app = express();
const cron = require("node-cron");
const User=require('./models/User')
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use(helmet());
app.use(xss());
const {
  authenticateUser,
  CheckAdminAuth,
} = require("./middleware/authentication");
//connectDB
const connectDB = require("./db/connect");
//routers
const authRouter = require("./route/auth");
const leaveRouter = require("./route/leave");
const departmentRouter = require("./route/department");
const leaveTypeRouter = require("./route/leaveType");
const EmployeeRouter = require("./route/user");
const AdminRouter = require("./route/admin");

//error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

// app.set('trust proxy',1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/leave", authenticateUser, leaveRouter);
app.use(
  "/api/v1/department",
  departmentRouter
);
app.use("/api/v1/leaveType", leaveTypeRouter);
app.use("/api/v1/employee", authenticateUser, CheckAdminAuth, EmployeeRouter);
app.use("/api/v1/admin", authenticateUser, CheckAdminAuth, AdminRouter);

//middleware
app.use(notFound);
// app.use(errorHandlerMiddleware);
const createAdmin=async()=>{
 const user= await User.findOne({roles:ROLES.ADMIN})
 if(!user){
  User.create({
    name: process.env.name,
    email:process.env.email,
    password:process.env.password,
    roles: ROLES.ADMIN
  })

 }

}
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    createAdmin()
    app.listen(port, () => {
      console.log(`server is listening on port:${port}`);
    });
    cron.schedule("*/2 * * * *", async () => {
      await autoRejectLeaveRequests();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
