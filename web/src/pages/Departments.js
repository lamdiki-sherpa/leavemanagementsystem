import React, { useState, useEffect } from "react";
import Axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import TopBar from "../components/TopBar";

const Departments = () => {
  const [department, setDepartment] = useState([]);
  const [inputField, setInputField] = useState({
    DepartmentName: "",
    DepartmentDetails: "",
    DepartmentStatus: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.post(
        "/api/v1/department",
        inputField,
        config
      );
      const response = JSON.stringify(data);
      const department = JSON.parse(response);
      console.log(department);
    } catch (error) {
      console.log(error.response);
    }
  };

  const departmentViewHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.get("/api/v1/department", config);
      const response = JSON.stringify(data);
      const departments = JSON.parse(response);
      setDepartment(departments.departments);
      console.log(departments);
    } catch (error) {
      console.log(error.response);
    }
  };

  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    departmentViewHandler();
  }, []);
  return (
    <div class="container">
      <AdminSidebar />
      <main class="main-content">
        <TopBar />
        <div class="bottom-container">
          <div>
            <h3>Department</h3>
            <form onSubmit={submitHandler}>
              <div className="form-group mb-3">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  name="DepartmentName"
                  className=" my-2"
                  value={inputField.DepartmentName}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="from-label">Department Details</label>
                <input
                  type="text"
                  name="DepartmentDetails"
                  className="my-2"
                  value={inputField.DepartmentDetails}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="from-label">Department Status</label>
                <input
                  type="text"
                  name="DepartmentStatus"
                  className="my-2"
                  value={inputField.DepartmentStatus}
                  onChange={inputHandler}
                  required
                />
              </div>
              <button className="btn btn-secondary" type="submit">
                Add Department
              </button>
            </form>
            <hr />
            <button
              className="btn btn-secondary"
              onClick={departmentViewHandler}
            >
              View All Department
            </button>

            <table>
              <thead>
                <tr>
                  <td>Department Name</td>
                  <td>Purpose</td>
                  <td>Action</td>
                </tr>
              </thead>
            </table>

            {department && (
              <>
                {department.map((department) => {
                  const {
                    DepartmentName,
                    DepartmentDetails,
                    DepartmentStatus,
                    _id,
                  } = department;
                  return (
                    <tr key={_id}>
                      <td>{DepartmentName}</td>
                      <td>{DepartmentDetails}</td>
                      <td>
                        <button className="btn btn-primary">Update</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Departments;
