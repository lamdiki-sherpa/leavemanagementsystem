import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/leaveform.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const LeaveForm = () => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    LeaveType: "",
    StartLeaveDate: "",
    EndLeaveDate: "",
    AdminRemark: "",
    LeaveDetails: "",
    leavePriority:""
  });
  const [leaveTypes,setLeaveTypes]=useState([])
  const [token, setToken] = useState("");
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
        leavePriority:""
      })
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchLeaveType=async()=>{
    // const jwt = JSON.parse(localStorage.getItem("jwt"));
    // const config = {
    //   headers: { Authorization: `Bearer ${jwt.token}` },
    // };
    try {
      const {data}= await axios.get(
        "/api/v1/leaveType"
      );
    console.log(data.leaveTypes)
    setLeaveTypes(data.leaveTypes)
    } catch (error) {
      console.log(error.response);
    }
  }
  const checkLeave=async()=>{
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
  try {
    const {data}=await axios.get("api/v1/leave/check",config)
    console.log(data)
  } catch (error) {
    console.log(error.response)
  }
  }
  useEffect(()=>{
    fetchLeaveType()
    checkLeave()
  },[])


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
                    <select
                      name="LeaveType"
                      value={inputField.LeaveType}
                      onChange={inputHandler}
                      className="rounded"
                    >
                      {leaveTypes.map((leave)=>{
                      const {_id,LeaveTypeName}=leave
                      return <option key={_id} value={_id}>{LeaveTypeName}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="form-group mb-3">
                      <label className="form-label">Leave level</label>
                      <select
                        type="Number"
                        name="leavePriority"
                        className=" form-control my-2 rounded"
                        value={inputField.leavePriority}
                        onChange={inputHandler}
                        required
                      >
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                      </select>
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
