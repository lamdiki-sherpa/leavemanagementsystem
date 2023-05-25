const express=require('express')
const router= express.Router()
const {authenticateUser,CheckAdminAuth} =require('../middleware/authentication')
const {getAllDepartments,getDepartment,updateDepartment,deleteDepartment,createDepartment}=require('../controller/department')
router.route('/').post(authenticateUser,CheckAdminAuth,createDepartment).get(getAllDepartments)
router.route('/:id').get(authenticateUser,CheckAdminAuth,getDepartment).delete(authenticateUser,CheckAdminAuth,deleteDepartment).patch(authenticateUser,CheckAdminAuth,updateDepartment)

module.exports=router