const express=require('express')
const router= express.Router()
const multer=require('multer')
const {getAllEmployee,getEmployee,createEmployee,deleteEmployee,updateEmployee}=require('../controller/user')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+ '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.route('/').get(getAllEmployee)
router.post('/',upload.single('myPhoto'),createEmployee)
router.route('/:id').get(getEmployee).delete(deleteEmployee).patch(updateEmployee)

module.exports=router