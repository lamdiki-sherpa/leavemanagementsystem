import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
const Dashboard = ({user}) => {
  const navigate=useNavigate()
  const [inputField,setInputField]=useState({
    DepartmentName:'',
    DepartmentDetails:'',
    DepartmentStatus:''
  })
  const [employeeField,setEmployeeField]=useState({
      name:'',
      email:'',
      password:'',
      profile:''
  })
  const [leave,setLeave]=useState([])
  const [employee,setEmployee]=useState([])
  const [error,setError]=useState('')
  const [department,setDepartment]=useState([])
  const inputHandler=(e)=>{
    setInputField({...inputField,[e.target.name]:e.target.value})

  }
  //========================ADMIN CREATE DEPARTMENT=====================
    const submitHandler=async(e)=>{
      e.preventDefault();
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.post('/api/v1/department',inputField,config);
        const response=JSON.stringify(data);
        const department= JSON.parse(response)
        console.log(department);
                  
        
      } catch (error) {
        console.log(error.response)
      }
    }
    ///====================ADMIN VIEW ALL DEPARTMENT======================
    const departmentViewHandler=async()=>{
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.get('/api/v1/department',config);
        const response=JSON.stringify(data);
        const departments= JSON.parse(response)
        setDepartment(departments.departments)
        console.log(departments)
    } catch (error) {
    
  console.log(error.response)

  
}
    }
    //========================ADMIN CREATE NEW EMPLOYEE/USER==========================
    const employeeInputHandler=(e)=>{
      setEmployeeField({...employeeField,[e.target.name]:e.target.value})
      }
      const imageUpload=(event)=>{
        console.log(event.target.files[0])
        setEmployeeField({...employeeField,profile:event.target.files[0]})
       }
    const employeeCreateHandler=async(e)=>{
      e.preventDefault();
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
    const formdata= new FormData();
    formdata.append('myPhoto',employeeField.profile)
    formdata.append('name',employeeField.name)
    formdata.append('email',employeeField.email)
    formdata.append('password',employeeField.password)
    try {
       
        const { data } = await Axios.post('/api/v1/employee',formdata,config);
        const response=JSON.stringify(data);
        const employee=JSON.parse(response)
        console.log(employee);
        alert('successful')
       
    } catch (error) {
      console.log(error.response);
      }
  
    }
   
    //=======================ADMIN VIEW ALL EMPLOYEE=============================================
    const employeeViewHandler=async()=>{
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.get('/api/v1/employee',config);
        const response=JSON.stringify(data);
        const employee= JSON.parse(response)
        setEmployee(employee.employees)
      } catch (error) {
        console.log(error.response)

      }

    }
  // ======================================= ADMIN VIEW LEAVE ======================================================
    const viewHandler=async()=>{
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.get('/api/v1/admin',config);
        const response=JSON.stringify(data);
        const leave= JSON.parse(response)
        setLeave(leave.leaves)
    } catch (error) {
    if(error.response.statusText==="Unauthorized"){
      setError(error.response.data.msg)
  } 
  console.log(error.response.message)

  
}
    }
    //////////====================ADMIN LOGOUT=========================================
    const logoutHandler=async()=>{
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.get('/api/v1/auth/signout',config);
        const response=JSON.stringify(data);
        console.log(response)
        navigate('/login')
      } catch (error) {
        console.log(error.response)
      }
    }
    //////////////////////////////////////////////////////////////////////////
  return (
    <section className='text-start mx-4 '>
      <h3> Hello!{user}Admindashboard</h3>
      <button className='btn btn-primary' onClick={logoutHandler}>Logout</button><br/>

    ==================================  DEPARTMENT===========================================
    =========================================================================================
      <div className='col-4'>
         
        <div> <h3>Department</h3>
        <form onSubmit={submitHandler}>
       
        <div className='form-group mb-3'>
        <label className='form-label'>Department Name</label>
        <input type="text" name='DepartmentName' className=" my-2" 
        value={inputField.DepartmentName}
           onChange={inputHandler}
           required /> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Department Details</label>
          <input type="text" name='DepartmentDetails' className="my-2"
          value={inputField.DepartmentDetails}
           onChange={inputHandler}
          required/> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Department Status</label>
          <input type="text" name='DepartmentStatus' className="my-2"
          value={inputField.DepartmentStatus}
           onChange={inputHandler}
          required/> 
        </div>
        <button className='btn btn-secondary' type='submit'>Add Department</button>
        </form>
        <hr/>
        <button className='btn btn-secondary' onClick={departmentViewHandler}>View All Department</button>
        {department && <div>{department.map((department)=>{
        const {DepartmentName,DepartmentDetails,DepartmentStatus,_id}=department
        return <div key={_id}>
          <h3>{DepartmentName}</h3>
          <h3>{DepartmentDetails}</h3>
          <h3>{DepartmentStatus}</h3>
          <button className='btn btn-primary'>Update</button>
        <button className='btn btn-danger'>Delete</button>
        </div>
        })}</div>}
        

        </div><br/>

        =========================================EMPLOYEE============================================
        =============================================================================================
        <div>Employee</div>
       
        <form>
        <div className='form-group mb-3'>
          <label className='form-label'>Profile</label>
          <input type="file" name='myPhoto' className="form-control my-2"
           onChange={imageUpload}
          /> 
          </div>
        <div className='form-group mb-3'>
        <label className='form-label'>Name</label>
        <input type="text" name='name' className=" my-2" 
        value={employeeField.name}
           onChange={employeeInputHandler}
           required /> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Email</label>
          <input type="email" name='email' className="my-2"
          value={employeeField.email}
           onChange={employeeInputHandler}
          required/> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Password</label>
          <input type="password" name='password' className="my-2"
          value={employeeField.password}
           onChange={employeeInputHandler}
          required/> 
        </div>

        </form>
        <button className='btn btn-secondary' onClick={employeeCreateHandler}>Add Employee</button><br/>
        <button className='btn btn-secondary' onClick={employeeViewHandler}>Employee List</button>
        <table className='table'>
        <thead>
            <tr>
    <th scope='col'>ID</th>
    <th scope='col'>Name</th>
    <th scope='col'>Email</th>
  {/* ///===========================Department add garna banki xa ============================================ */}
    {/* <th scope='col'>Department</th> */} 
    <th scope='col'>salary</th>
    <th scope='col'>Action</th>
   
       </tr>
            </thead>
          {employee.map((employee)=>{
            const {_id,name,email,salary,roles,profile}=employee
          return <div>
          {roles==="STAFF" && <tbody>
            <tr key={_id}>
            <td>{_id}</td>
            <td><h3>{name}</h3>
            {profile?<img src={profile} style={{height:'80px',width:'80px'}}/>:<img style={{height:'80px',width:'80px'}}/>} 
            </td>
            <td>{email}</td>
            <td>Rs.{salary}</td>
            <td>
            <button className='btn btn-primary'>Update</button>
            <button className='btn btn-danger'>Delete</button>
            </td>
            </tr>
          
          </tbody>
          
          }
          </div>
          })}
        </table>
       
       
      </div><br/>
      ================================== LEAVE===========================================
    =========================================================================================
      <div>Leave Application</div>
        {error && <div>{error}</div>}
        <button className='btn btn-secondary' onClick={viewHandler}>View all leave application</button>
        <table className='table'>
          <thead>
        <tr>
    <th scope='col'>Created By</th>
    <th scope='col'>Leave Type</th>
    <th scope='col'>Start date</th>
    <th scope='col'>End date</th>
    <th scope='col'>Action</th>
   
       </tr>
       </thead>
          {leave.map((leave)=>{
          const {_id,LeaveType,StartLeaveDate,EndLeaveDate,AdminStatus,AdminRemark,
          }=leave
          const {createdBy:{name,profile}}=leave
          console.log(profile)
          return <tbody>

  <tr key={_id}>
    <td>
     <h3>{name}</h3> 
      <img src={profile} style={{height:'80px',width:'80px'}}/>
      </td>
    <td>{LeaveType}</td>
    <td>{StartLeaveDate}</td>
    <td>{EndLeaveDate}</td>
    <td>
      <button className='btn btn-success'>Approve</button>
      <button className='btn btn-danger'>Decline</button>
    </td>
  </tr>
 </tbody> 
        
         })}
       
        </table>
     
    
    </section>
  )
}

export default Dashboard