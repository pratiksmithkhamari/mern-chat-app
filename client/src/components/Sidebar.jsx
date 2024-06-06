import {
  AccountCircleRounded,
  AddCircle,
  DarkMode,
  ExitToApp,
  GroupAdd,
  PersonAdd,
  SearchOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConvoItem from "./ConvoItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import axios from "axios";

function Sidebar() {
  const [isConversation, setIsConversation] = useState([]);
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    axios.get("http://localhost:3000/chat/",{
      headers:{
        Authorization: `Bearer ${userdata.token}`
      }
    }).then((response)=>{
      // console.log("response",response);
      // console.log(response.data);
      setIsConversation(response.data)
    })
  
  }, []);
  // 
// ,
  return (
    <div className="sm:w-[30%] w-[15%] dark:bg-black dark:text-zinc-400 bg-zinc-100  overflow-y-scroll overflow-scroll rounded-xl text-slate-700">
      <div className="header flex  justify-between bg-white sm:flex-row flex-col sm:w-[90%] w-14  items-center  rounded-3xl px-2 py-3 m-3 dark:bg-zinc-700 dark:text-zinc-400 dark:shadow-lg">
        <div className="flex items-center ">
          {/* use iconbutton which have prebuild osm clickable ui */}

          <AccountCircleRounded fontSize="large" />
        </div>
        <div className="flex items-center sm:flex-row flex-col  sm:h-fit h-[550px] justify-around">
          <IconButton onClick={() => navigate("onlineuser")}>
            <PersonAdd />
          </IconButton>
          <IconButton onClick={() => navigate("groups")}>
            <GroupAdd />
          </IconButton>
          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircle />
          </IconButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <IconButton
            onClick={() => {
              navigate("/");
              localStorage.removeItem("userdata");
            }}
          >
            <ExitToApp />
          </IconButton>
        </div>
      </div>
      <div className="search sm:flex dark:bg-zinc-700 dark:text-zinc-400 dark:shadow-lg items-center bg-white rounded-3xl m-3 px-4 hidden">
        <IconButton>
          <SearchOutlined />
        </IconButton>

        <input
          className="w-[250px] dark:bg-zinc-700 dark:text-zinc-400 dark:shadow-lg rounded-full p-3 outline-none text-[1.2rem] "
          placeholder="Search..."
        />
      </div>
      {isConversation.length > 0 &&
        isConversation.map((conversation,index) => {
          // console.log(conversation,"convo item");
          
          return (
            
              <div className="convo flex-1 flex-col sm:flex hidden bg-white dark:bg-black dark:text-slate-500  rounded-3xl m-1 px-4 overflow-y-scroll overflow-scroll " key={index}>
                <ConvoItem conversationData={conversation}/>
              </div>
        
          );
        })}
    </div>
  );
}

export default Sidebar;
