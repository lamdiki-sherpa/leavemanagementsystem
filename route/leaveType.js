const express=require('express')
const router= express.Router()
// const {authenticateUser} =require('../middleware/authentication')
const {updateLeaveType,getAllLeaveTypes,getLeaveType,createLeaveType,deleteLeaveType}=require('../controller/LeaveType')
router.route('/').post(createLeaveType).get(getAllLeaveTypes)
router.route('/:id').get(getLeaveType).delete(deleteLeaveType).patch(updateLeaveType)

module.exports=router