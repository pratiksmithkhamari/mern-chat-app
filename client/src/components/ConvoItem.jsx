import { AccountCircleRounded } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConvoItem = ({ conversationData, index }) => {
  const navigate = useNavigate();

  if (conversationData.users.length === 1) {
    return <div key={index}></div>;
  }

  const latestMessageText = conversationData.latestMessage
    ? conversationData.latestMessage.text
    : "No messages yet";

  const latestMessageTime = conversationData.latestMessage
    ? conversationData.latestMessage.time 
    : "N/A";

  return (
    <div
      key={index}
      className="m-3 flex gap-3 cursor-pointer items-center hover:bg-zinc-100 p-2 rounded-2xl active:bg-slate-200 dark:bg-zinc-700 dark:text-zinc-400 dark:shadow-lg"
      onClick={() => navigate("chat/"+ conversationData._id + "&" + conversationData.users[1].name )}
    >
      <div>
        <AccountCircleRounded />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">{conversationData.users[1].name}</h2>
        <div className="flex justify-between w-[250px] ">
          <h3 className="text-sm line-clamp-1">{latestMessageText}</h3>
          <h3 className="text-sm">{latestMessageTime}</h3>
        </div>
      </div>
    </div>
  );
};

export default ConvoItem;
