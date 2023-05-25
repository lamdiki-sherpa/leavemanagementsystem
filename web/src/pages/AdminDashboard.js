import React, { useEffect, useState } from "react";
import Axios from "axios";
import TopBar from "../components/TopBar";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = ({ user }) => {
  const [leave, setLeave] = useState([]);
  const [error, setError] = useState("");
  const [leaveRecords, setLeaveRecords] = useState("");

  // ======================================= ADMIN VIEW LEAVE ======================================================
  // const viewHandler = async () => {
  //   const jwt = JSON.parse(localStorage.getItem("jwt"));
  //   const config = {
  //     headers: { Authorization: `Bearer ${jwt.token}` },
  //   };
  //   try {
  //     const { data } = await Axios.get("/api/v1/admin", config);
  //     const response = JSON.stringify(data);
  //     const leave = JSON.parse(response);
  //     setLeave(leave.leaves);
  //     console.log(leave.leaves);
  //   } catch (error) {
  //     if (error.response.statusText === "Unauthorized") {
  //       setError(error.response.data.msg);
  //     }
  //     console.log(error.response.message);
  //   }
  // };

  const viewHandler = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
      params: {
        sortBy: 'leavePriority',
        AdminStatus:'Pending'
      }
    };
    try {
      const { data } = await Axios.get("/api/v1/leave",config);
      const response = JSON.stringify(data);
      const leave = JSON.parse(response); 
      console.log(leave.leaves)
      // setLeave(leave.leaves)
      const scoredRequests = leave.leaves.map((request) => {
        return { ...request };
      });
      scoredRequests.sort((a, b) => {
        if (a.leavePriority === b.leavePriority) {
          return b.leaveScore - a.leaveScore;
        }
        return a.leavePriority - b.leavePriority;
      });
      setLeave(scoredRequests);
      // setLeaveRecords(leave.leaves);
      // leave.leaves.map(function (currentValue) {
      //   console.log(currentValue, "cvv");
      //   if (
      //     currentValue.AdminStatus == "Approved" ||
      //     currentValue.AdminStatus == "Pending"
      //   ) {
      //     setLeaveRecords(currentValue);
      //   }
      // });
    } catch (error) {
      if (error.response.statusText === "Unauthorized") {
        setError(error.response.data.msg);
      }
      console.log(error.response.message);
    }
  };

  console.log(leaveRecords, "LR");

  const leavedeclineHandler = async (id, e) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    console.log(jwt)
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.put(`/api/v1/leave/${id}/reject`,{},config);
      const response = JSON.stringify(data);
      console.log(response, "res");
      const leave = JSON.parse(response);
      console.log(leave, "leave");
      e.target.innerText = "Declined";
      const deleteButton = document.getElementById(`approve-button${id}`);
      deleteButton.classList.add("d-none");
    } catch (error) {
      console.log(error.response);
    }
  };

  const leaveapproveHandler = async (id, e) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      const { data } = await Axios.put(
        `/api/v1/leave/${id}/approve`,{},
        config
      );
      const response = JSON.stringify(data);
      console.log(response, "ress");
      const leave = JSON.parse(response);
      console.log(leave);
      console.log(e.target, "target");
      e.target.innerText = "Approved";
      const deleteButton = document.getElementById(`decline-button${id}`);
      deleteButton.classList.add("d-none");
      console.log(deleteButton, "dltbtn");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    viewHandler();
  }, []);

  console.log(leave, "leave");

  return (
    <div className="container">
      <AdminSidebar />
      <main class="main-content">
        <TopBar />
        <div class="bottom-container">
          <h4>Track working time with Top Tracker</h4>
          <a href="https://tracker.toptal.com/app/projects?tab=active&sort-by=project-name&sort-order=asc">
            <button className="btn-success">Download</button>
          </a>
          <div>Leave Application</div>
          {error && <div>{error}</div>}
          {/* <button className="btn btn-secondary" onClick={viewHandler}>
            View all leave application
          </button> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Created By</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Start date</th>
                <th scope="col">End date</th>
                <th scope="col">Leave Detail</th>
                <th scope="col">Action</th>
                <th scope="col">Leave Status</th>
              </tr>
            </thead>
            {leave.map((leave) => {
              const {
                _id,
                LeaveType,
                StartLeaveDate,
                EndLeaveDate,
                AdminStatus,
                AdminRemark,
                LeaveDetails,
              } = leave;
              const {
                createdBy: { name, profile },
              } = leave;
              // console.log(profile)
              return (
                <tbody>
                  <tr key={_id}>
                    <td>
                      <h3>{name}</h3>
                      <img
                        src={profile}
                        style={{ height: "80px", width: "80px" }}
                      />
                    </td>
                    <td>{LeaveType}</td>
                    <td>{StartLeaveDate.split("T00:00:00.000Z")}</td>
                    <td>{EndLeaveDate.split("T00:00:00.000Z")}</td>
                    <td>{LeaveDetails}</td>
                    <td>
                      <button
                        className="btn btn-success w-100 m-1"
                        id={`approve-button${_id}`}
                        onClick={(e) => leaveapproveHandler(_id, e)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger w-100 m-1"
                        id={`decline-button${_id}`}
                        onClick={(e) => leavedeclineHandler(_id, e)}
                      >
                        Decline
                      </button>
                    </td>
                    <td>
                      <button className="bg-warning p-2">{AdminRemark}</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
