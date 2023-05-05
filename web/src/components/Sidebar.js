import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LeaveManagement from "../assets/Images/a.jpeg";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const EMPLOYEE_DASHBOARD = {
    INDEX: "/employee-dashboard",
  };

  const logoutHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await axios.get("/api/v1/auth/signout", config);
      const response = JSON.stringify(data);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <nav className="sidebar">
      <div>
        <div className="sidebar__logo">
          <img className="logo-image" src={LeaveManagement} />
        </div>
        <ul className="side-nav">
          <span className="side-nav__header">Main Menu</span>
          <li className="side-nav__item" id="link1">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.23201 3.4202L9.23239 3.41989C10.2108 2.63408 11.7843 2.63834 12.7781 3.42994C12.7783 3.43005 12.7784 3.43015 12.7785 3.43025L18.7784 8.2301C18.7789 8.23054 18.7795 8.23099 18.78 8.23143C19.1189 8.50835 19.4146 8.94381 19.6058 9.44415C19.7968 9.94409 19.8672 10.4662 19.8014 10.8985L18.6475 17.8037C18.6474 17.8042 18.6473 17.8047 18.6472 17.8052C18.4217 19.0989 17.1608 20.1667 15.8585 20.1667H6.1418C4.81982 20.1667 3.58766 19.1252 3.36227 17.8148C3.36221 17.8145 3.36215 17.8142 3.36209 17.8138L2.20746 10.9043L2.20726 10.9032C2.13345 10.4677 2.19947 9.94466 2.39002 9.44498C2.58055 8.94535 2.87982 8.51038 3.22697 8.2334L3.22784 8.2327L9.23201 3.4202ZM11.0001 18.1876C11.6521 18.1876 12.1876 17.652 12.1876 17.0001V14.2501C12.1876 13.5981 11.6521 13.0626 11.0001 13.0626C10.3482 13.0626 9.81263 13.5981 9.81263 14.2501V17.0001C9.81263 17.652 10.3482 18.1876 11.0001 18.1876Z"
                fill="currentColor"
                stroke="currentColor"
              />
            </svg>
            {/* <span>Dashboard</span> */}
            <NavLink
              to={EMPLOYEE_DASHBOARD.INDEX}
              onClick={() =>
                document
                  .getElementById("link1")
                  .classList.add("side-nav__item-active")
              }
            >
              Dashboard leave
            </NavLink>
          </li>
          <li className="side-nav__item" id="link2">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.30664 17.1375V15.24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M11 17.1375V13.3425"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M15.6934 17.1375V11.4358"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M15.6933 5.86255L15.2716 6.35755C12.9341 9.08922 9.79914 11.0234 6.30664 11.8942"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M13.0073 5.86255H15.6932V8.53922"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.25016 20.6667H13.7502C18.3335 20.6667 20.1668 18.8334 20.1668 14.25V8.75004C20.1668 4.16671 18.3335 2.33337 13.7502 2.33337H8.25016C3.66683 2.33337 1.8335 4.16671 1.8335 8.75004V14.25C1.8335 18.8334 3.66683 20.6667 8.25016 20.6667Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <NavLink
              to="/leave-form"
              onClick={() =>
                document
                  .getElementById("link2")
                  .classList.add("side-nav__item-active")
              }
            >
              Apply For Leave
            </NavLink>
          </li>
          <li className="side-nav__item" id="link3">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.90576 7.32001L10.9999 12.0042L19.0391 7.34748"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 20.3092V11.995"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.10256 2.77331L4.20757 5.49584C3.0984 6.11001 2.19092 7.64999 2.19092 8.91499V14.0942C2.19092 15.3592 3.0984 16.8992 4.20757 17.5133L9.10256 20.2359C10.1476 20.8134 11.8617 20.8134 12.9067 20.2359L17.8017 17.5133C18.9109 16.8992 19.8184 15.3592 19.8184 14.0942V8.91499C19.8184 7.64999 18.9109 6.11001 17.8017 5.49584L12.9067 2.77331C11.8526 2.18665 10.1476 2.18665 9.10256 2.77331Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5834 12.6366V9.28167L6.88428 4.2583"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <NavLink
              to="/applied-leave"
              onClick={() =>
                document
                  .getElementById("link3")
                  .classList.add("side-nav__item-active")
              }
            >
              Applied Leaves
            </NavLink>
          </li>
          <li className="side-nav__item" id="link4">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1668 9.66671V14.25C20.1668 18.8334 18.3335 20.6667 13.7502 20.6667H8.25016C3.66683 20.6667 1.8335 18.8334 1.8335 14.25V8.75004C1.8335 4.16671 3.66683 2.33337 8.25016 2.33337H12.8335"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1668 9.66671H16.5002C13.7502 9.66671 12.8335 8.75004 12.8335 6.00004V2.33337L20.1668 9.66671Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.4165 12.4166H11.9165"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.4165 16.0834H10.0832"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {/* <span>Invoices</span> */}
            <NavLink
              to="/company-leave"
              onClick={() =>
                document
                  .getElementById("link4")
                  .classList.add("side-nav__item-active")
              }
            >
              Company Leave
            </NavLink>
          </li>
        </ul>
      </div>

      <ul className="side-nav">
        <li className="side-nav__item last-item">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.8999 8.05999C9.2099 4.45999 11.0599 2.98999 15.1099 2.98999H15.2399C19.7099 2.98999 21.4999 4.77999 21.4999 9.24999V15.77C21.4999 20.24 19.7099 22.03 15.2399 22.03H15.1099C11.0899 22.03 9.2399 20.58 8.9099 17.04"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.0001 12.5H3.62012"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.85 9.14999L2.5 12.5L5.85 15.85"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <button className="btn btn-primary" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
