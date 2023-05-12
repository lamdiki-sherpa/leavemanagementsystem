const express=require('express')
const router= express.Router()
const {getAllLeaves,getLeave,updateLeave,deleteLeave,createLeave}=require('../controller/leave')

router.route('/').post(createLeave).get(getAllLeaves)
router.route('/:id').get(getLeave).delete(deleteLeave).patch(updateLeave)
module.exports=router