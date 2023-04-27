const Department=require('../models/Department')
const {BadRequestError,NotFoundError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const getAllDepartments=async(req,res)=>{
const departments = await Department.find()
res.status(StatusCodes.OK).json({departments,count:departments.length})
}
const getDepartment=async(req,res)=>{
    const {params:{id:departmentId}}=req
    const department = await Department.findOne({
        _id:departmentId
    })
    if(!department){
        throw new NotFoundError(`No  department with id ${departmentId}`)
    }
    res.status(StatusCodes.OK).json({department})
}
const createDepartment=async(req,res)=>{
    // req.body.createdBy=req.user.userId
    const department= await Department.create(req.body)
    res.status(StatusCodes.CREATED).json({department})
}
const updateDepartment=async(req,res)=>{
    const {body:{DepartmentName,DepartmentDetails,DepartmentStatus},params:{id:departmentId}}=req
    if(DepartmentName==="" || DepartmentDetails==="" || DepartmentStatus===""){
        throw new BadRequestError('Field cannot be empty ')
    }
    const department= await Department.findByIdAndUpdate({_id:departmentId},req.body,{new:true,runValidators:true})
    if(!department){
        throw new NotFoundError(`No  department with id ${departmentId}`)
    }
    res.status(StatusCodes.OK).json({department})

}
const deleteDepartment=async(req,res)=>{
    const {params:{id:departmentId}}=req
    const department= await Department.findByIdAndRemove({_id:departmentId})
    if(!department){
        throw new NotFoundError(`No  job with id ${departmentId}`)
    }
    res.status(StatusCodes.OK).send()
}
module.exports={getAllDepartments,getDepartment,updateDepartment,deleteDepartment,createDepartment}






