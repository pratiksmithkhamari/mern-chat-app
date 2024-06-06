import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

export const accessChats = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var chat = await Chat.find({
    isGrouptChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email",
  });
  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGrouptChat: false,
      users: [req.user._id, userId],
    };
    try {
      var createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(201).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

export const fetchChats = async (req, res) => {
  try {
    console.log("Fetch Chats aPI : ", req);
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin","-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email ",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
export const fetchGroups = async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
export const createGroupsChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Data is insufficient" });
  }

  var users = JSON.parse(req.body.users);
  console.log("chatController/createGroups : ", req);
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
export const exitGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};


export const addSelfToGroups =async (req,res)=>{
  const {chatId,userId}=req.body
  const added = await Chat.findByIdAndUpdate(
   userId,{
     $push:{ users:userId}
   },
   {
     new:true

   }
  ).populate("users","-password")
  .populate("isGroupAdmin","-password")

  if(!added){
     res.status(404).json({
        message:"chat not found",
        success:false
    })
  }else{
    res.status(201).json(added)
  }
}