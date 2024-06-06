import {
  AccountCircle,
  Search,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../assets/conversation.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnlineUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (!userdata) {
      console.log("user not authenticated");
      navigate(-1);
    }
  }, [userdata, navigate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/alluser", {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.log("error in fetching users", error);
      }
    };
    
    if (userdata) {
      getData();
    }
  }, [userdata]);

  return (
    <div className="w-[70%] rounded-lg flex flex-col gap-5 m-3 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="flex px-4 items-center rounded-md shadow-md border-b-2">
        <div className="m-3 flex gap-3 w-[90%] items-center p-2">
          <div className="flex items-center gap-1">
            <img src={Logo} alt="" className="w-10" />
            <h2 className="font-semibold cursor-pointer font-mono text-blue-700 text-opacity-75 tracking-tighter text-lg">
              Let's Chat
            </h2>
          </div>
        </div>
      </div>
      <div className="flex-1 gap-7 flex flex-col bg-zinc-100 overflow-y-scroll overflow-scroll dark:bg-zinc-950 dark:text-zinc-400">
        {/* search-bar */}
        <div className="w-[90%] border rounded-lg h-[14%] p-2 flex items-center ml-9 shadow-md gap-2 dark:bg-white dark:text-zinc-400">
          <IconButton>
            <Search />
          </IconButton>
          <input
            type="text"
            placeholder="Search Online User"
            className="w-[70%] bg-zinc-100 outline-none text-[1.3rem] text-slate-700"
          />
        </div>

        {/* user list */}
        {users.length > 0 &&
          users.map((user, index) => (
            <div
              key={index}
              className="flex w-[90%] items-center gap-4 bg-zinc-100 p-5 rounded-lg ml-9 shadow-sm border cursor-pointer active:bg-slate-200 transition-all ease-in hover:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-400"
              onClick={()=>{
                 axios.post("http://localhost:3000/chat/",{
                  userId:user._id
                 },{
                  headers:{
                    Authorization:`Bearer ${userdata?.token}`
                  }
                 }
                )
              }}
            >
              <AccountCircle />
              <h2 className="text-xl text-slate-700">{user.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OnlineUser;
