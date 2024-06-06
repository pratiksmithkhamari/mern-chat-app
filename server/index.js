import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./models/userModel.js";
import jwt from "jsonwebtoken";
dotenv.config();
import { route } from "./routes/userRoute.js";
import { dbConnection } from "./dbConnection/databaseConnect.js";
import { chatRouter } from "./routes/chatRoute.js";
import { messageRouter } from "./routes/messagesRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", route);
app.use('/chat',chatRouter);
app.use('/message',messageRouter)

const port = process.env.PORT || 5000;

//db connection
dbConnection();

app.get("/test", (req, res) => {
  res.json("good");
});

app.post("/user/register", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({
      msg: "invalid credentials",
      success: false,
    });
  }
  const newUser = await User.create({ name, password });

  const token = jwt.sign(
    { _id: newUser._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    },
    (err, token) => {
      if (err) throw err;

      res.cookie("token", token, { httpOnly: true }).status(201).json({
        msg: "user created successfully",
        success: true,
        token,
      });
    }
  );

  console.log(newUser);
});

app.listen(port, () => {
  console.log("server running..");
});
