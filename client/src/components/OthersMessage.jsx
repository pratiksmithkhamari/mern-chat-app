import { AccountCircle } from "@mui/icons-material";
import React from "react";

function OthersMessage({ props }) {
  console.log("Received message: skjdfnkjd", props);

  return (
    <div className="m-2 flex items-center gap-2 z-50">
      <AccountCircle />
      <div className="rounded-2xl p-3 bg-zinc-300 flex flex-col dark:text-zinc-400 dark:bg-zinc-700 dark:shadow-lg">
        <h3>{props.content}</h3>
        <p className="text-end text-[0.6rem] mt-2">
          {new Date(props.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default OthersMessage;
