import React,{useState} from 'react'
import Axios from 'axios'
const Dashboard = ({user}) => {
  const [inputField,setInputField]=useState({
    DepartmentName:'',
    DepartmentDetails:'',
    DepartmentStatus:''
  })
  const [error,setError]=useState('')
  const [department,setDepartment]=useState([])
  const inputHandler=(e)=>{
    setInputField({...inputField,[e.target.name]:e.target.value})

  }
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
    
    const viewHandler=async()=>{
      const jwt= JSON.parse(localStorage.getItem('jwt'))
      const config = {
        headers: { Authorization: `Bearer ${jwt.token}` }
      };
      try {
        const { data } = await Axios.get('/api/v1/admin',config);
        const response=JSON.stringify(data);
        const user= JSON.parse(response)
        console.log(user.leaves[0])
        console.log(user.count)
    } catch (error) {
    if(error.response.statusText==="Unauthorized"){
      setError(error.response.data.msg)
  } 
  console.log(error.response.message)

  
}
    }
  return (
    <section className='text-start mx-4'>
      <h3> Hello!{user}Admindashboard</h3>
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
        </div>
        })}</div>}
        <button className='btn btn-secondary'>Update Department</button>
        <button className='btn btn-secondary'>Delete Department</button>

        </div>
        <div>Leave Type</div>
        <button className='btn btn-secondary'>Add Leave Type</button>
        <button className='btn btn-secondary'>View All Leave Type</button>
        <button className='btn btn-secondary'>Delete Leave Type</button>
        <button className='btn btn-secondary'>Update Leave Type</button>
        <div>Employee</div>
        <button className='btn btn-secondary'>Add Employee</button>
        <button className='btn btn-secondary'>Employee List</button>
        <button className='btn btn-secondary'>Delete Employee</button>
        <button className='btn btn-secondary'>Update Employee</button>
        <div>Leave Application</div>
        {error && <div>{error}</div>}
        <button className='btn btn-secondary' onClick={viewHandler}>View all leave application</button>
      </div>

     
    
    </section>
  )
}

export default Dashboard