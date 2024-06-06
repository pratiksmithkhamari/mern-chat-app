import express from "express";
import { authMiddleware } from "../config/middleware.js";
import {
  accessChats,
  addSelfToGroups,
  createGroupsChat,
  exitGroup,
  fetchChats,
  fetchGroups,
} from "../controllers/chatControllers.js";

export const chatRouter = express.Router();

chatRouter.route("/").post(authMiddleware, accessChats);
chatRouter.route("/").get(authMiddleware, fetchChats);
chatRouter.route("/createGroup").post(authMiddleware, createGroupsChat);
chatRouter.route("/fetchGroups").get(authMiddleware, fetchGroups);
chatRouter.route("/exitGroup").put(authMiddleware, exitGroup);
chatRouter.route("/addSelfToGroup").put(authMiddleware, addSelfToGroups);