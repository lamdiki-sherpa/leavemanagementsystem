import React, { createContext, useState } from "react";

export const LeaveContext = createContext();

const LeaveContextProvider = ({ children }) => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const [employeeName, setEmployeeName] = useState("");

  return (
    <LeaveContext.Provider
      value={{ inputField, setInputField, employeeName, setEmployeeName }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveContextProvider;
