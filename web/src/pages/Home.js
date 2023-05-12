import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../App.css'; 
const Home = () => {
  const navigate=useNavigate()
  const [inputField,setInputField]=useState({
    LeaveType:'',
    priority: 'Low' ,
    StartLeaveDate:'',
    EndLeaveDate:'',
    AdminRemark:'',
    // AdminStatus:'pending',
    LeaveDetails:'',

    
  })
  const [token,setToken]=useState('')
  const [leave,setLeave]=useState([])
  const [errors,setErrors]=useState('')
  const [status,setStatus]=useState(false)
  const inputHandler=(e)=>{
    setInputField({...inputField,[e.target.name]:e.target.value})
   
  } 
  useEffect(()=>{
    const jwt=JSON.parse(localStorage.getItem('jwt'))
    const tokens=jwt.token
    console.log(tokens)
    setToken(tokens)
  },setToken)
 
  const submitHandler=async(e)=>{
    e.preventDefault();
    const jwt= JSON.parse(localStorage.getItem('jwt'))
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` }
    };
    try {
      const { data } = await axios.post('/api/v1/leave',inputField,config);
      const response=JSON.stringify(data);
      const leave= JSON.parse(response)
      console.log(leave);
      
      // const start=new Date(leave.leave.StartLeaveDate).getTime() 
      // const end=new Date(leave.leave.EndLeaveDate).getTime() 
      // const diffInMs=end-start
      // const diffInDay=Math.floor(diffInMs/(1000 * 60 * 60 * 24))
      // console.log(diffInDay);
      setStatus(leave.leave.leaveStatus)
     
     
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
        const { data } = await axios.get('/api/v1/leave',config);
        const response=JSON.stringify(data);
        const user= JSON.parse(response)
        setLeave(user.leaves)
        console.log(user.leaves);
    } catch (error) {
  console.log(error.response)

  
}
  }
  const deleteHandler=async(id)=>{
    const jwt= JSON.parse(localStorage.getItem('jwt'))
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` }
    };
    try {
      await axios.delete(`/api/v1/leave/${id}`,config);
      setLeave(leave.filter((leave)=>{
        return leave._id!==id;
      }))
      
  } catch (error) {
console.log(error.response)


}
  }
  const updateHandler=async(id)=>{
    const jwt= JSON.parse(localStorage.getItem('jwt'))
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` }
    };
 
    try {
      await axios.patch(`/api/v1/leave/${id}`,inputField,config);
     
  } catch (error) {
console.log(error.response)


}
  }
  const logoutHandler=async()=>{
    const jwt= JSON.parse(localStorage.getItem('jwt'))
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` }
    };
    try {
      const { data } = await axios.get('/api/v1/auth/signout',config);
      const response=JSON.stringify(data);
      console.log(response)
      navigate('/login')
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
  <section>
    <h3>Employee page</h3>
    <p style={{marginTop:'-10px',letterSpacing:'6px'}}>Good morning employee</p>
    <button className='btn btn-primary' onClick={logoutHandler}>Logout</button><br/>
    {/* {token?<button className='btn btn-success'>active</button>:<button className='btn btn-danger'>deactive</button>} */}
    <div className='col-6 text-start mx-4'>
     {errors && <div>{errors}</div>}   
    <form  onSubmit={submitHandler}>Leave Form
        <div className='form-group mb-3'>
        <label className='form-label'>Start date:</label>
        <input type="date" name='StartLeaveDate' className="form-control my-2" 
        value={inputField.StartLeaveDate}
        onChange={inputHandler}
        required /> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>End date:</label>
          <input type="date" name='EndLeaveDate' className=" form-control my-2"
          value={inputField.EndLeaveDate}
           onChange={inputHandler}
          required/> 
        </div>
        <div className='form-group mb-3'>
          <label className='from-label'>Leave Type:</label>
          <input type="text" name='LeaveType' className=" form-control my-2"
          value={inputField.LeaveType}
           onChange={inputHandler}
          required/> 
          </div>
          <div>
          <label>
              Priority:
              <select
                name="priority"
                value={inputField.priority}
                onChange={inputHandler}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </label>
        </div>
        {/* <div className='form-group mb-3'>
          <label className='from-label'>Leave type:</label>
          <select name="LeaveType" value={inputField.LeaveType} onChange={inputHandler}>
          <option value="Sick">Sick</option>
          <option value="Paternity">Paternity</option>
          <option value="Maternity">Maternity</option>
          <option value="Sick">Sick</option>
          <option value="Bereavement">Bereavement</option>
          <option value="Compensatory">Compensatory</option>
          </select>
        </div> */}
        <div className='form-group mb-3'>
          <label className='from-label'>Why leave?</label>
          <textarea rows="4" cols="80" name="LeaveDetails"   
          value={inputField.LeaveDetails}
          onChange={inputHandler}/>
        </div>
        <div>Hello hi</div>
      {status?<button type="submit" className="btn btn-primary button my-3" disabled>Submit</button>:<button type="submit" className="btn btn-primary button my-3" >Submit</button>}  
    </form>
     </div>
     <button type='button' onClick={viewHandler} className='btn btn-secondary'>View leave created</button>
     {leave && <div>{leave.map((leave)=>{
      const {_id,LeaveType,EndLeaveDate,AdminRemark,AdminStatus,StartLeaveDate,leaveStatus}=leave
    
      return <div key={_id}>
        <h3>{LeaveType}</h3>
        <h3>{StartLeaveDate}</h3>
        <h3>{EndLeaveDate}</h3>
        <h3>{AdminRemark}</h3>
        <h3>{AdminStatus}</h3>
        <button onClick={()=>deleteHandler(_id)}  className='btn btn-danger'>Delete leave</button>
        <button onClick={()=>updateHandler(_id)} className='btn btn-success'>Update leave</button>
      </div>
     })}</div>}
  </section>
  )
}

export default Home