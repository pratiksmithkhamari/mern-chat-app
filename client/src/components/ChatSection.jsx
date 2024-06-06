import {
  AccountCircleRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import OthersMessage from "./OthersMessage";
import SelfMessage from "./SelfMessage";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChatSection() {
  const [messageText, setMessageText] = useState("");
  const [sendMessage, setSendMessage] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const params = useParams();
  const [chat_id,chat_user] = params._id.split("&");
console.log(chat_user,"chat user name");
  let config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };
  // sent the message
  const sendMsg = () => {
    axios
      .post(
        "http://localhost:3000/message/",
        {
          content: messageText,
          chatId: chat_id,
        },
        config
      )
      .then((response) => {
        console.log("response from chat sec", response);
      });
  };

  // get or  fetch the message send by message api
  useEffect(() => {
    axios.get("http://localhost:3000/message/"+ chat_id, config).then((response) => {
      console.log(response.data, "get the msg");
      setSendMessage(response.data);
    });
  }, [userData.token,chat_id]);

  return (
    <div className="sm:w-[70%] w-[90%] flex flex-col rounded-xl overflow-hidden dark:bg-black dark:text-zinc-500">
      {/* header for chat section */}
      <div className="bg-blue-600 flex px-4  items-center  dark:bg-zinc-800 dark:text-zinc-500 ">
        <div className="m-3 flex gap-3 w-[90%] items-center bg-white p-2 rounded-3xl ">
          <div>
            <AccountCircleRounded className="cursor-pointer" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold cursor-pointer">{chat_user}</h2>
            <div className="flex justify-between w-[250px] ">
              <h3 className="text-sm line-clamp-1">1hr ago</h3>
            </div>
          </div>
        </div>
        <div>
          <IconButton>
            <DeleteOutlineRounded sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>

      {/* message sending here */}
      <div className="flex-1 bg-slate-200 overflow-y-scroll overflow-scroll dark:bg-black dark:text-zinc-500">
        {sendMessage
          .slice(0)
          .reverse()
          .map((message, index) => {
            let senderId = message.sender._id;
            let selfId = userData._id;
            if (senderId === selfId ) {
              return <SelfMessage props={message} key={message._id} />;
            } else {
              return <OthersMessage props={message} key={message._id} />;
            }
          })}
      </div>

      {/* chat input box  */}
      <div className="border-t-2 bg-slate-300 flex items-center bg-opacity-30">
        <input
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          onKeyDown={(e) => {
            if (e.code == "Enter") {
              sendMsg();
              setMessageText("");
            }
          }}
          className="w-[60%] my-2 mx-6  rounded-xl p-3 outline-none "
          placeholder="Sent a message"
        />
        <div className="bg-blue-800 text-white rounded-full ">
          <IconButton
            sx={{ color: "white" }}
            onClick={(e) => {
              sendMsg();
              setMessageText("");
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
