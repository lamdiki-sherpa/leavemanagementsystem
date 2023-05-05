import React, { useState, useEffect } from "react";
import Axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import TopBar from "../components/TopBar";

const Employees = () => {
  const [employeeField, setEmployeeField] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [employee, setEmployee] = useState([]);
  const [leaverecord, setLeaverecord] = useState([]);

  const employeeInputHandler = (e) => {
    setEmployeeField({ ...employeeField, [e.target.name]: e.target.value });
  };

  const imageUpload = (event) => {
    console.log(event.target.files[0]);
    setEmployeeField({ ...employeeField, profile: event.target.files[0] });
  };

  const employeeViewHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.get("/api/v1/employee", config);
      const response = JSON.stringify(data);
      const employee = JSON.parse(response);
      setEmployee(employee.employees);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    employeeViewHandler();
  }, []);

  const leavebysingleemployeeHandler = async (id) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.get(`/api/v1/employee/leaves/${id}`, config);
      const response = JSON.stringify(data);
      const leavebysingleemployee = JSON.parse(response);
      setLeaverecord(leavebysingleemployee.leaves);
    } catch (error) {
      console.log(error.response);
    }
  };

  const employeeCreateHandler = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    const formdata = new FormData();
    formdata.append("myPhoto", employeeField.profile);
    formdata.append("name", employeeField.name);
    formdata.append("email", employeeField.email);
    formdata.append("password", employeeField.password);
    try {
      const { data } = await Axios.post("/api/v1/employee", formdata, config);
      const response = JSON.stringify(data);
      const employee = JSON.parse(response);
      console.log(employee);
      alert("successful");
    } catch (error) {
      console.log(error.response);
    }
  };

  const adminupdateEmployeeHandler = async (id) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    const salary = prompt("Enter new salary:");
    try {
      await Axios.patch(`/api/v1/employee/${id}`, { salary: salary }, config);
      setEmployee(
        employee.map((val) => {
          return val._id === id
            ? {
                _id: id,
                name: val.name,
                email: val.email,
                salary: salary,
                roles: val.roles,
                profile: val.profile,
              }
            : val;
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const admindeleteEmployeeHandler = async (id) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      await Axios.delete(`/api/v1/employee/${id}`, config);
      setEmployee(
        employee.filter((val) => {
          return val._id !== id;
        })
      );
    } catch (error) {}
  };

  return (
    <div class="container">
      <AdminSidebar />
      <main class="main-content">
        <TopBar />
        <div class="bottom-container">
          <>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope='col'>ID</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  {/* ///===========================Department add garna banki xa ============================================ */}
                  {/* <th scope='col'>Department</th> */}
                  <th scope="col">salary</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((employee) => {
                  const { _id, name, email, salary, roles, profile } = employee;
                  return (
                    <>
                      {roles === "STAFF" && (
                        <tr key={_id}>
                          <td>
                            {profile ? (
                              <img
                                src={profile}
                                style={{ height: "80px", width: "80px" }}
                              />
                            ) : (
                              <img style={{ height: "80px", width: "80px" }} />
                            )}
                            <h3>{name}</h3>
                          </td>
                          <td>{email}</td>
                          <td>Rs.{salary}</td>
                          <td className="d-flex">
                            <button
                              className="btn btn-primary m-1 p-0"
                              onClick={() => adminupdateEmployeeHandler(_id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger m-1 p-0"
                              onClick={() => admindeleteEmployeeHandler(_id)}
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => leavebysingleemployeeHandler(_id)}
                              className="btn btn-secondary m-1 p-0"
                            >
                              Leave records
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
            <>
              <table>
                <thead className="bg-success text-white">
                  <td>Leave Type</td>
                  <td>Admin Status</td>
                  <td>Name</td>
                </thead>
                {leaverecord &&
                  leaverecord.map((leave) => {
                    const { AdminStatus, LeaveType, createdBy } = leave;
                    {
                      console.log(createdBy, "createdBy");
                    }
                    return (
                      <tr>
                        <td>{LeaveType}</td>
                        <td>{AdminStatus}</td>
                        <td>{createdBy.name}</td>
                      </tr>
                    );
                  })}
              </table>
            </>
            <span>Add new Employee</span>
            <form>
              <div className="form-group mb-3">
                <label className="form-label">Profile</label>
                <input
                  type="file"
                  name="myPhoto"
                  className="form-control my-2"
                  onChange={imageUpload}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className=" my-2"
                  value={employeeField.name}
                  onChange={employeeInputHandler}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="from-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="my-2"
                  value={employeeField.email}
                  onChange={employeeInputHandler}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="from-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="my-2"
                  value={employeeField.password}
                  onChange={employeeInputHandler}
                  required
                />
              </div>
            </form>
            <button
              className="btn btn-secondary"
              onClick={employeeCreateHandler}
            >
              Add Employee
            </button>
            <br />
            {/* <button className="btn btn-secondary" onClick={employeeViewHandler}>
              Employee List
            </button> */}
          </>
        </div>
      </main>
    </div>
  );
};

export default Employees;
