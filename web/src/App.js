import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import LeaveForm from "./pages/LeaveForm";
import Error from "./pages/Error";
import Context from "./contextApi/ContextForApp";
import CompanyLeave from "./pages/CompanyLeave";
import AppliedLeave from "./pages/AppliedLeave";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import LeaveType from "./pages/LeaveType";
import AdminCompanyLeave from "./components/AdminCompanyLeave";
import { LeaveContext } from "./contextApi/LeaveContext";

function App() {
  const [user, setUser] = useState("");
  const { adminLoggedIn, setAdminLoggedIn, userLoggedIn, setuserLoggedIn } =
    useContext(LeaveContext);

  return (
    <div className="App">
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path="/employeedashboard" element={<Home />} />
            <Route path="/admindashboard" element={<Dashboard user={user} />} />
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Signin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/leave-form" element={<LeaveForm />} />
            <Route path="/company-leave" element={<CompanyLeave />} />
            <Route path="/applied-leave" element={<AppliedLeave />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/leaveType" element={<LeaveType/>} />
            <Route
              path="/admin-company-leave"
              element={<AdminCompanyLeave />}
            />
          </Routes>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
