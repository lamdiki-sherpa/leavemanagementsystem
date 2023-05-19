import React,{useEffect, useState,useContext} from 'react'
import AdminSidebar from '../components/AdminSidebar'
import TopBar from '../components/TopBar'
import axios from 'axios'
import { LeaveContext } from '../contextApi/LeaveContext'
const LeaveType = () => {
    const {   leaveTpes, 
      setLeaveTypes}=useContext(LeaveContext)
    const [inputField, setInputField] = useState({
        LeaveTypeName: "",
        LeaveTypeDetails: "",
        LeavePerYear: "",
        LeavePriority:""
      });
      const submitHandler = async (e) => {
        e.preventDefault();
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const config = {
          headers: { Authorization: `Bearer ${jwt.token}` },
        };
        try {
          const { data } = await axios.post(
            "/api/v1/leaveType",
            inputField,
            config
          );
          const response = JSON.stringify(data);
          const leaveType = JSON.parse(response);
          console.log(leaveType);
        } catch (error) {
          console.log(error.response);
        }
      };
    
      const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
      };
      const fetchLeaveType=async()=>{
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        const config = {
          headers: { Authorization: `Bearer ${jwt.token}` },
        };
        try {
          const {data}= await axios.get(
            "/api/v1/leaveType",
            config
          );
        console.log(data.leaveTypes)
          setLeaveTypes(data.leaveTypes)
        } catch (error) {
          console.log(error.response);
        }
      }
      useEffect(()=>{
        fetchLeaveType()
      })
  return (
    <div class="container">
    <AdminSidebar />
    <main class="main-content">
      <TopBar />
      <div class="bottom-container">
        <div>
          <h3>Leave Type</h3>
          <form onSubmit={submitHandler}>
            <div className="form-group mb-3">
              <label className="form-label">Leave Name</label>
              <input
                type="text"
                name="LeaveTypeName"
                className=" my-2"
                value={inputField.LeaveTypeName}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="from-label">Available leave days(per year)</label>
              <input
                type="text"
                name="LeavePerYear"
                className="my-2"
                value={inputField.DepartmentDetails}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="from-label">Leave Details</label>
              <input
                type="text"
                name="LeaveTypeDetails"
                className="my-2"
                value={inputField.LeaveTypeDetails}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="from-label">Leave priority(must be in number 1,2 or 3)</label>
              <input
                type="text"
                name="LeavePriority"
                className="my-2"
                value={inputField.LeavePriority}
                onChange={inputHandler}
                required
              />
            </div>
            <button className="btn btn-secondary" type="submit">
              Add LeaveType
            </button>
          </form>
          </div>
          </div>
          <div>
            <h1>Leave Types</h1>
                <table>
                    <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Available days(per year)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaveTpes.map((leave)=>{
                    const {_id,LeavePerYear,LeaveTypeName}=leave
                      return (
                        <tr key={_id}>
                        <td>{LeaveTypeName}</td>
                        <td>{LeavePerYear}</td>
                        </tr>
                        )}) }
                    </tbody>
                </table>
            
          </div>
          </main>
          </div>
  )
}

export default LeaveType