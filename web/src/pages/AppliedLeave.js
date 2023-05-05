import React, { useContext, useEffect } from "react";
import axios from "axios";
import { LeaveContext } from "../contextApi/LeaveContext";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AppliedLeave = () => {
  const { leave, setLeave } = useContext(LeaveContext);

  const deleteHandler = async (id) => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: { Authorization: `Bearer ${jwt.token}` },
    };
    try {
      await axios.delete(`/api/v1/leave/${id}`, config);
      setLeave(
        leave.filter((leave) => {
          return leave._id !== id;
        })
      );
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

  useEffect(() => {
    viewHandler();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <main class="main-content">
        <TopBar />
        <div class="container">
          <table>
            <thead className="available-days text-white rounded">
              <tr>
                <td className="px-2">Leave Type</td>
                <td>Leave From</td>
                <td>Leave To</td>
                <td>Leave Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {leave && (
                <>
                  {leave.map((leave) => {
                    const {
                      _id: leaveId,
                      LeaveType,
                      EndLeaveDate,
                      AdminRemark,
                      AdminStatus,
                      createdBy,
                      StartLeaveDate,
                      createdAt,
                      updatedAt,
                    } = leave;
                    return (
                      <tr key={leaveId}>
                        <td>{LeaveType}</td>
                        <td>{StartLeaveDate.split("T00:00:00.000Z")}</td>
                        <td>{EndLeaveDate.split("T00:00:00.000Z")}</td>
                        <td>{AdminStatus}</td>
                        <button
                          onClick={() => deleteHandler(leaveId)}
                          className="bg-danger rounded p-2 w-75 m-2"
                        >
                          Delete leave
                        </button>
                        <button
                          onClick={updateHandler}
                          className="bg-success rounded p-2 w-75 m-2"
                        >
                          Update leave
                        </button>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AppliedLeave;
