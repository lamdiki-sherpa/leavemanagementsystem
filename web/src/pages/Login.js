import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LeaveContext } from "../contextApi/LeaveContext";
import "../css/login.css";
import Axios from "axios";
const Login = ({ setUser }) => {
  const {
    inputField,
    setInputField,
    adminLoggedIn,
    setAdminLoggedIn,
    userLoggedIn,
    setuserLoggedIn,
  } = useContext(LeaveContext);
  const navigate = useNavigate();
  const [errors, setError] = useState("");

  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/v1/auth/login", inputField);
      const response = JSON.stringify(data);
      const user = JSON.parse(response);

      console.log(user.user.name);
      console.log(user.token);
      localStorage.setItem(
        "jwt",
        JSON.stringify({ login: true, token: user.token })
      );
      if (user.user.roles === "ADMIN") {
        setuserLoggedIn(true);
        navigate("/admindashboard");
      } else {
        setAdminLoggedIn(true);
        navigate("/employeedashboard");
      }
    } catch (error) {
      if (error.response.statusText === "Unauthorized") {
        setError(error.response.data.msg);
      }
      console.log(error.response);
    }
  };

  return (
    <>
      <div>
        <div class="app">
          <div class="bg"></div>
          <div>{errors && <div>{errors}</div>}</div>
          <form onSubmit={submitHandler} className="position-absolute">
            <header>
              <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" />
            </header>

            <div class="inputs">
              <input
                type="email"
                name="email"
                placeholder="username or email"
                className="border-0 text-white"
                value={inputField.email}
                onChange={inputHandler}
                required
              />

              <input
                type="password"
                name="password"
                className="form-control my-2 border-0"
                value={inputField.password}
                onChange={inputHandler}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary button my-3">
              Login In
            </button>
            <div className=" mb-3">
              New user? <Link to="/register">create your account</Link>
              {/* <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
