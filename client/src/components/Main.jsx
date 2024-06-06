import Sidebar from "./Sidebar";
import React from "react";

import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex  sm:h-[90%] h-[100vh] sm:w-[90%] w-[100vw] bg-gray-100 rounded-xl">
      <Sidebar />
      <Outlet />
      
      {/* <Sidebar />
      <CreateGroup /> */}
      {/* <Welcome /> */}
      {/* <ChatSection /> */}

      
    </div>
  );
};

export default Main;
