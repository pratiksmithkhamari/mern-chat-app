import React, { useState } from "react";
import { Button } from "./ui/button";
import Gif from "../assets/conversation.gif";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast ,Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandle, setErrorHandle] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    if (isRegister) {
      await signUpHandler(data);
    } else {
      await loginHandler(data);
    }
  };

  const handleRegister = () => {
    setIsRegister((prev) => !prev);
  };

  // Login API call
  const loginHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("userdata", JSON.stringify(response.data));
      toast.success(response.data.message);
      navigate("/app/welcome");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setErrorHandle(error.response?.data?.message || error.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-up API call
  const signUpHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      localStorage.setItem("userdata", JSON.stringify(response.data));
      navigate("/app/welcome");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
      
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <div className="h-[90%] w-[90%] flex">
        <div className="w-0 flex justify-center items-center flex-col bg-gradient-to-r from-zinc-200 to-zinc-100 border-r-2 overflow-hidden rounded-lg shadow-xl sm:w-[30%] ">
          <div className="w-56">
            <img src={Gif} alt="Conversation GIF" />
          </div>
          <div>
            <h1 className="text-5xl text-blue-700 text-opacity-65 shadow-2xl rounded-3xl p-3 font-serif font-semibold">
              Let's Chat
            </h1>
          </div>
        </div>

        <div className="h-[90vh] sm:w-[70%] w-[100%] flex justify-center items-center relative shadow-xl">
          <div className="bgImg z-0 h-[100%] w-[100%] absolute overflow-hidden"></div>
          <form
            onSubmit={handleFormSubmit}
            className="h-[90vh] w-full flex justify-center items-center"
          >
            <div className="grid w-full sm:max-w-sm max-w-80 items-center gap-5">
              <h2 className="text-center capitalize text-3xl text-blue-700 z-50 font-semibold">
                {isRegister
                  ? "Sign Up for an Account"
                  : "Login to Your Account"}
              </h2>
              <TextField
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {isRegister && (
                <TextField
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              )}
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* {errorHandle && (
                <p className="text-red-600 z-50">*{errorHandle}</p>
              )} */}
              <Button
                className="z-50 bg-blue-700 hover:bg-blue-800 text-white active:bg-blue-900 transition-all ease-in text-[1.2rem]"
                type="submit"
                disabled={isLoading}
              >
                {isRegister ? "Sign Up" : "Login"}
              </Button>
              <h2 className="capitalize font-semibold z-50 text-black text-center">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <span
                  className="text-blue-700 ml-2 cursor-pointer"
                  onClick={handleRegister}
                >
                  {isRegister ? "Sign In" : "Register"}
                </span>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
