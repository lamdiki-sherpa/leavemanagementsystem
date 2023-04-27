const User=require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError}=require('../errors')

const register=async(req,res)=>{
    // const {name,email,password}=req.body
    // if(!name || !email || !password){
    //   throw new BadRequestError('please provide name,email and password')
    // }////even without this the validation still works because of mongoose validator we defined in user model
    // step 2.const salt= await bcrypt.genSalt(10)
    // const hashedPassword =await bcrypt.hash(password,salt)
    // const tempUser = {name,email,password:hashedPassword}
    // const user= await User.create({...tempUser})
    // const profile=(req.file)?req.file.filename:null
    // const {name,email,password}=req.body
    // let user= new User({name,email,password,profile})
    // let response=await data.save()
    // const user= await User.create({...req.body})
    // const token =user.createJWT()
        //  OR
        // User.findOne({email:req.body.email},(err,user)=>{
        //     if(user){
        //         res.send({msg:"User already registered!"})
        //     }
        // })   
    const user =await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        profile:req.file.filename
    })
  
    const token =user.createJWT()
    res.status(StatusCodes.CREATED).json({user,token})
    // res.status(StatusCodes.CREATED).json({user:{name:user.name},token})/*we are sending token and username 
    // as a response after creating a user*/
}
const login=async(req,res)=>{
const {email,password}=req.body
if(!email || !password){
 throw new BadRequestError('please provide email and password')
}
const user= await User.findOne({email})
if(!user){
    throw new UnauthenticatedError('User not found')
}
const passwordMatch=await user.comparePassword(password)
if(!passwordMatch){
    throw new UnauthenticatedError('Password is incorrect')
}
const token =user.createJWT()
// res.status(StatusCodes.OK).json({user,token})
res.status(StatusCodes.OK).json({msg:"Login Successfull",user:{name:user.name,roles:user.roles},token})
}
 


module.exports={register,login}