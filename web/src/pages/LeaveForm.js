import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import "../css/leaveform.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { LeaveContext } from '../contextApi/LeaveContext'
const LeaveForm = () => {
  const { leaveTypes,setLeaveTypes }=useContext(LeaveContext)
  const [inputField, setInputField] = useState({
    LeaveType: "",
    StartLeaveDate: "",
    EndLeaveDate: "",
    AdminRemark: "",
    // AdminStatus:'pending',
    LeaveDetails: "",
    leavePriority:""
  });

  // const [token, setToken] = useState("");
  const [errors, setErrors] = useState("");
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await axios.post("/api/v1/leave", inputField, config);
      const response = JSON.stringify(data);
      const leave = JSON.parse(response);
      console.log(leave);
      setInputField({
        LeaveType: "",
        StartLeaveDate: "",
        EndLeaveDate: "",
        AdminRemark: "",
        LeaveDetails: "",
        leavePriority: ""
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // useEffect(() => {
  //   const jwt = JSON.parse(localStorage.getItem("jwt"));
  //   const tokens = jwt.token;
  //   console.log(tokens);
  //   setToken(tokens);
  // }, setToken);
  // const fetchLeaveType=async()=>{
  //   const jwt = JSON.parse(localStorage.getItem("jwt"));
  //   const config = {
  //     headers: { Authorization: `Bearer ${jwt.token}` },
  //   };
  //   try {
  //     const {data}= await axios.get(
  //       "/api/v1/leaveType",
  //       config
  //     );
  //   console.log(data.leaveTypes)
  //   (data.leaveTypes)
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }
  
  return (
    <div className="container">
      <Sidebar />
      <main class="main-content">
        <TopBar />
        <div class="container">
          <section>
            <h3>Employee page</h3>
            <p style={{ marginTop: "-10px", letterSpacing: "6px" }}>
              Good morning employee
            </p>
            <div className="">
              {errors && <div>{errors}</div>}
              <form onSubmit={submitHandler}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="form-group mb-3">
                      <label className="form-label">Start date:</label>
                      <input
                        type="date"
                        name="StartLeaveDate"
                        className="form-control my-2 rounded"
                        value={inputField.StartLeaveDate}
                        onChange={inputHandler}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">End date:</label>
                      <input
                        type="date"
                        name="EndLeaveDate"
                        className=" form-control my-2 rounded"
                        value={inputField.EndLeaveDate}
                        onChange={inputHandler}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Leave type:</label> <br />
                    <input
                      name="LeaveType"
                      value={inputField.LeaveType}
                      onChange={inputHandler}
                      className="rounded">


                    {/* {leaveTypes.map((leave)=>{
                      const {_id,LeaveTypeName}=leave
                      return (
                        <>
                       <option value={_id}>{LeaveTypeName}</option>
                       </>
                      )
                    })} */}
                     
                   
                      {/* <option value="Sick">Sick</option>
                      <option value="Paternity">Paternity</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Bereavement">Bereavement</option>
                      <option value="Annual">Annual</option>
                      <option value="Religious">Religious</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Compensatory">Compensatory</option> */}
                    </input>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Level</label>{" "}
                  <br />
                  {/* <select
                   className="rounded"
                    name="LeavePriority"
                    value={inputField.leavePriority}
                    onChange={inputHandler}
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                     
                  </select> */}
                  <input
                  type="number"
                  name="leavePriority"
                  value={inputField.leavePriority}
                  onChange={inputHandler}
                  required 
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Why do you need a leave?</label>{" "}
                  <br />
                  <textarea
                    rows="4"
                    cols="80"
                    name="LeaveDetails"
                    value={inputField.LeaveDetails}
                    onChange={inputHandler}
                  />
                </div>
                <button type="submit" className="btn btn-primary button my-3">
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LeaveForm;
