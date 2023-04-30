import React, { useState } from "react";
import axios from "axios";
import "../css/employee.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../App.css";
import EmployeeDashboard from "../components/EmployeeDashboard";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const [inputField, setInputField] = useState({
    LeaveType: "",
    StartLeaveDate: "",
    EndLeaveDate: "",
    AdminRemark: "",
    // AdminStatus:'pending',
    LeaveDetails: "",
  });
  const [leave, setLeave] = useState([]);
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
    } catch (error) {
      console.log(error.response);
    }
  };
  const viewHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await axios.get("/api/v1/leave", config);
      const response = JSON.stringify(data);
      const user = JSON.parse(response);
      setLeave(user.leaves);
      console.log(user.leaves);
      console.log(user.leaves[0]._id);
      console.log(user.count);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteHandler = async (id) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      await axios.delete(`/api/v1/leave/:${id}`, config);
      const updatedLeaves = leave.filter((leave) => {
        return id !== leave._id;
      });
      setLeave(updatedLeaves);
    } catch (error) {
      console.log(error.response);
    }
  };
  const updateHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await axios.get("/api/v1/leave/:id", config);
      const response = JSON.stringify(data);
      const user = JSON.parse(response);
      setLeave(user.leaves);
      console.log(user.leaves);
      console.log(user.count);
    } catch (error) {
      console.log(error.response);
    }
  };

  const EMPLOYEE_DASHBOARD = {
    INDEX: "/employee-dashboard",
  };
  return (
    <div class="container">
      <Sidebar />
      <EmployeeDashboard />
    </div>
  );
};

export default Home;
