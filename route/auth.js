const express=require('express')
const router= express.Router()
const multer=require('multer')
const {register,login,signOut}=require('../controller/auth')
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
// const upload = multer({ dest: 'uploads/' })
router.post('/register',upload.single('myFile'),register)
router.post('/login',login)
router.get('/signout',signOut)

module.exports=router