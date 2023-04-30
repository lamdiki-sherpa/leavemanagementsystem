import React from "react";

import LeaveContextProvider from "./LeaveContext";

const Context = ({ children }) => {
  return <LeaveContextProvider>{children}</LeaveContextProvider>;
};

export default Context;
