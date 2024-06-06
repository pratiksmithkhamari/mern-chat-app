import { useNavigate } from "react-router-dom";
import Gif from "../assets/conversation.gif";

const Welcome = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userdata"));
  console.log(userData.name);
  if (!userData) {
    navigate("/");
    console.log("user not authenticated");
  }

  return (
    <div className="flex justify-center flex-col sm:flex-row  items-center sm:w-[70%] sm:ml-0 ml-5 w-[84%] bg-blue-700 bg-opacity-30 rounded-xl">
      <div className=" sm:w-56 w-64  ">
        <img src={Gif} alt="" />
      </div>

      <div>
        <h1 className="text-2xl ml-5 font-semibold text-blue-900 font-serif">Welcome {userData.name}</h1>
        <h1 className="text-5xl text-blue-700 text-opacity-65 shadow-2xl  rounded-3xl p-3 font-serif  font-semibold">
          Let's Chat
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
