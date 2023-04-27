const express=require('express')
const router= express.Router()
const {getAllEmployee,getEmployee,createEmployee,deleteEmployee,updateEmployee}=require('../controller/user')


router.route('/').post(createEmployee).get(getAllEmployee)
router.route('/:id').get(getEmployee).delete(deleteEmployee).patch(updateEmployee)

module.exports=router