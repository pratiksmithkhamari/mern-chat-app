import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";

export const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("receiver")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(400).json({ error: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res
      .sendStatus(400)
      .json({ error: "Invalid data passed into request" });
  }

  try {
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await message.populate("receiver");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(400).json({ error: "Failed to send message" });
  }
};
