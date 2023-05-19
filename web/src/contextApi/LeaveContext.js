import React, { createContext, useState } from "react";

export const LeaveContext = createContext();

const LeaveContextProvider = ({ children }) => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [userLoggedIn, setuserLoggedIn] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [leave, setLeave] = useState([]);
  const [leaveTpes, setLeaveTypes] = useState([]);
  return (
    <LeaveContext.Provider
      value={{
        inputField,
        setInputField,
        employeeName,
        setEmployeeName,
        leave,
        setLeave,
        adminLoggedIn,
        setAdminLoggedIn,
        userLoggedIn,
        setuserLoggedIn,
        leaveTpes, 
        setLeaveTypes
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContextProvider;
