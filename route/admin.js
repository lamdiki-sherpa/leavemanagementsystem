const express=require('express')
const router= express.Router()
const {getAllLeaveByAdmin}=require('../controller/admin')
router.route('/').get(getAllLeaveByAdmin)

module.exports=router