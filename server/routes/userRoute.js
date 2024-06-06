import express from "express";
import {
  fetchAllUser,
  loginController,
  registerController,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../config/middleware.js";

export const route = express.Router();

route.post("/login", loginController);

route.post("/register", registerController);

route.get('/alluser',authMiddleware,fetchAllUser)
