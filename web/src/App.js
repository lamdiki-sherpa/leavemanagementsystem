import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import LeaveForm from "./pages/LeaveForm";
// import ProtectedRoute from './pages/ProtectedRoute';
// import SharedProductLayout from './pages/SharedProductLayout';
import Error from "./pages/Error";
import Context from "./contextApi/ContextForApp";
import CompanyLeave from "./pages/CompanyLeave";

function App() {
  const [user, setUser] = useState("");

  // const EMPLOYEE_DASHBOARD = {
  //   INDEX: "/employee-dashboard",
  // };

  return (
    <div className="App">
      <Context>
        <BrowserRouter>
          {/* <Login/> */}
          <Routes>
            <Route path="/employeedashboard" element={<Home />} />
            <Route path="/admindashboard" element={<Dashboard user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Signin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/leave-form" element={<LeaveForm />} />
            <Route path="/company-leave" element={<CompanyLeave />} />
          </Routes>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
