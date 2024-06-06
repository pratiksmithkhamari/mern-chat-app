import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};


