import React from "react";

function SelfMessage({props}) {
  console.log("Received message: self", props);

  return (
    <div className="flex justify-end mb-2 gap-3">
      <div className="rounded-xl bg-blue-600 p-3 text-white ml-24 mr-2 flex items-center justify-center">
        <h3>{props.content}</h3>
        <p className="text-end ml-3 text-[0.6rem] mt-2 ">{new Date(props.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
}

export default SelfMessage;
