import React, { useState, useEffect, useContext } from "react";
import "../css/employee.css";
import { LeaveContext } from "../contextApi/LeaveContext";

import "../App.css";
import EmployeeDashboard from "../components/EmployeeDashboard";
const Home = () => {
  const { adminLoggedIn, setAdminLoggedIn, userLoggedIn, setuserLoggedIn } =
    useContext(LeaveContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const tokens = jwt.token;
    console.log(tokens);
    setToken(tokens);
  }, setToken);

  return (
    <div class="container">
      <EmployeeDashboard />
    </div>
  );
};

export default Home;
