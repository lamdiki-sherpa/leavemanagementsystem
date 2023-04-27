const express=require('express')
const router= express.Router()
// const {authenticateUser} =require('../middleware/authentication')
const {getAllDepartments,getDepartment,updateDepartment,deleteDepartment,createDepartment}=require('../controller/department')
router.route('/').post(createDepartment).get(getAllDepartments)
router.route('/:id').get(getDepartment).delete(deleteDepartment).patch(updateDepartment)

module.exports=router