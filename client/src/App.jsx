import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Welcome from "./components/Welcome";
import ChatSection from "./components/ChatSection";
import OnlineUser from "./components/OnlineUser";
import CreateGroup from "./components/CreateGroup";
import Groups from "./components/Groups";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  
  return (
    <>
      <div className=" h-[100vh]  w-full flex justify-center items-center">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Main />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="chat/:_id" element={<ChatSection />} />
            <Route path="onlineuser" element={<OnlineUser />} />
            <Route path="create-groups" element={<CreateGroup />} />
            <Route path="groups" element={<Groups />} />
          </Route>
        </Routes>
        </ThemeProvider>

        {/* <Main /> */}
      </div>
      {/* <BrowserRouter>
     <Routes>
     <Route path='/login' element={<Login />}  />
     <Route path='/home' element={<Home />}  />
     </Routes>
     
     </BrowserRouter> */}
    </>
  );
}

export default App;
