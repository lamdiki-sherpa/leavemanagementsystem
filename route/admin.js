const express=require('express')
const router= express.Router()
const {getAllLeaveByAdmin,getSingleLeaveByAdmin,updateLeaveByAdmin}=require('../controller/admin')
router.route('/').get(getAllLeaveByAdmin)
router.route('/:id').get(getSingleLeaveByAdmin).patch(updateLeaveByAdmin)
module.exports=router