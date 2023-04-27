import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios'
const Login = ({setUser}) => {
    const navigate=useNavigate()
    const [errors,setError]=useState('')
    const [inputField,setInputField]=useState({
        email:'',
        password:''

    })
    const inputHandler=(e)=>{
    setInputField({...inputField,[e.target.name]:e.target.value})

    }
    const submitHandler= async(e)=>{
        e.preventDefault();
        try {
            
                const { data } = await Axios.post('/api/v1/auth/login',inputField);
                const response=JSON.stringify(data);
                const user= JSON.parse(response)
                
                console.log(user.user.name)
                console.log(user.token)
                localStorage.setItem('jwt',JSON.stringify({login:true,token:user.token}))
                if(user.user.roles==="ADMIN"){
                   navigate('/admindashboard')
                }else{
                   navigate('/employeedashboard')
                }
                
          } catch (error) {
            if(error.response.statusText==="Unauthorized"){
                setError(error.response.data.msg)
            }
            console.log(error.response);
          
        }
         
    }
   
  return (
    <div className='col-6 text-start mx-4'>
     {errors && <div>{errors}</div>}   
    <form  onSubmit={submitHandler}>Login
        <div className='form-group mb-3'>
        <label className='form-label'>Email</label>
        <input type="email" name='email' className="form-control my-2" 
        value={inputField.email}
           onChange={inputHandler}
           required /> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Password</label>
          <input type="password" name='password' className=" form-control my-2"
          value={inputField.password}
           onChange={inputHandler}
          required/> 
        </div>
        <button type="submit" className="btn btn-primary button my-3">Login In</button>
        <div className=' mb-3'>
         New user?{' '} <Link to='/register'>create your account</Link>
         {/* <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> */}
        </div>
    </form>
     </div>
  )
}


export default Login