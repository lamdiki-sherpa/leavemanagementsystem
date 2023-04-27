const User=require('../models/User')
const {BadRequestError,NotFoundError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const getAllEmployee=async(req,res)=>{
const employees = await User.find()
res.status(StatusCodes.OK).json({employees,count:employees.length})
}
const getEmployee=async(req,res)=>{
    const {params:{id:employeeId}}=req
    const employee = await User.findOne({
        _id:employeeId
    })
    if(!employee){
        throw new NotFoundError(`No  employee with id ${employeeId}`)
    }
    res.status(StatusCodes.OK).json({employee})
}
const createEmployee=async(req,res)=>{
    // req.body.createdBy=req.user.userId
    const employee= await User.create(req.body)
    res.status(StatusCodes.CREATED).json({employee})
}
const updateEmployee=async(req,res)=>{
    const {body:{name,email,roles},params:{id:employeeId}}=req
    if(name==="" || email==="" || roles==""){
        throw new BadRequestError('Field cannot be empty ')
    }
    const employee= await User.findByIdAndUpdate({_id:employeeId},req.body,{new:true,runValidators:true})
    if(!employee){
        throw new NotFoundError(`No  employee with id ${employeeId}`)
    }
    res.status(StatusCodes.OK).json({employee})

}
const deleteEmployee=async(req,res)=>{
    const {params:{id:employeeId}}=req
    const employee= await User.findByIdAndRemove({_id:employeeId})
    if(!employee){
        throw new NotFoundError(`No  job with id ${employeeId}`)
    }
    res.status(StatusCodes.OK).send(
        
    )
}
module.exports={getAllEmployee,getEmployee,createEmployee,deleteEmployee,updateEmployee}