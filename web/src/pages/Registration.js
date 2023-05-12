import React,{useState} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Signin = () => {
    const navigate=useNavigate()
    const [inputField,setInputField]=useState({
      name:'',
      email:'',
      password:'',
      profile:'',
    })
    const [error,setError]=useState('')
    const inputHandler=(e)=>{
      setInputField({...inputField,[e.target.name]:e.target.value})
    }
    const imageUpload=(event)=>{
     console.log(event.target.files[0])
     setInputField({...inputField,profile:event.target.files[0]})
    }
    const submitHandler=async(e)=>{
    e.preventDefault();
    const formdata= new FormData();
    formdata.append('myFile',inputField.profile)
    formdata.append('name',inputField.name)
    formdata.append('email',inputField.email)
    formdata.append('password',inputField.password)
    try {
       
        const { data } = await Axios.post('/api/v1/auth/register',formdata);
        const response=JSON.stringify(data);
        const value=JSON.parse(response)
        console.log(response);
        console.log(value)
        alert('Registration successful')
        navigate('/login')
      
        
      } catch (error) {
        if(error.response.statusText==="Bad Request"){
          setError(error.response.data.msg)
      }
      console.log(error.response);
      }
  
    }
  return (
    <div className='col-6 text-start mx-4'>
         <h1 className='my-3'>Registration</h1>
        <form onSubmit={submitHandler} method='POST'>
        <div className='form-group mb-3'>
          <label className='form-label'>Profile</label>
          <input type="file" name='myFile' className="form-control my-2"
           onChange={imageUpload}
          /> 
          </div>
        <div className='form-group mb-3'>
        <label className='form-label'>Name</label>
           <input type="name" name='name' className="form-control my-2" 
           value={inputField.name}
           onChange={inputHandler}
           required /> 

        </div>
        <div className='form-group mb-3'>
        <label className='form-label'>Email</label>
        <input type="email" name='email' className="form-control my-2" 
        value={inputField.email}
           onChange={inputHandler}
           required /> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Password</label>
          <input type="password" name='password' className="form-control my-2"
          value={inputField.password}
           onChange={inputHandler}
          required/> 
        </div>
       <button type="submit" className="btn btn-primary button my-3">Sign up</button>
       
        </form>
        {error &&<div>{error}</div>}
    </div>
  )
}

export default Signin