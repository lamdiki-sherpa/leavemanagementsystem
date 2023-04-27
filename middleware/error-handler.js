const {CustomAPIError}=require('../errors')
const {StatusCodes}=require('http-status-codes')
const errorHandlerMiddleware=(err,req,res,next)=>{
  // if(err instanceof CustomAPIError){
  //   return res.status(err.statusCode)
  //   .json({msg:err.message})
  // }

  const customError={
  statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  msg:err.message || 'something went wrong,Try again later'
  }
  if(err.name==='ValidationError'){
    customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode = 400
  }///ift user doesnot provide email,password or name during registration
  if(err.name==='CastError'){
   customError.msg=`No item with id:${err.value} `
   customError.statusCode=400
  }////if the provided id for job is incorrect
  if(err.code && err.code===11000){
   customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)}.Please choose another value`,
   customError.statusCode = 400
  }
//  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json({msg:customError.msg})

    
}

module.exports=errorHandlerMiddleware