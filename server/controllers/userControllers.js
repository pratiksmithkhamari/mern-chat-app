import { generateToken } from "../config/generateToken.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export const loginController = async(req, res) => {
  const {name,password} = req.body
     const user = await User.findOne({name})
     
     if(!user){
      res.status(401).json({
        message:"please register"
      })
     }

    //  compare the login password with the stored password in the db for authentication 
     const matchedPass =await bcrypt.compare(password,user.password)
     if(user && matchedPass){
       return res.json({
          _id:user._id,
          msg:"login successful",
          name:user.name,
          email:user.email,
          token: generateToken(user._id)
        })
     }
     else{
       return res.status(401).json({
        message:"user invalid credentials"
      })
     }
};
export const registerController = async (req, res) => {

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.json({ msg: "please fill all details" });
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({
      msg:"user already exist"
    })
  }
  // hash the password before sent to db 
  const hashedPass =await bcrypt.hash(password,10)
  const newUser = await User.create({ name, email, password:hashedPass });
  return res.status(201).json({
   name:newUser.name,
   email:newUser.email,
    password:newUser.password,
   token:generateToken(newUser._id)
  });
};

export const fetchAllUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id }
  }) 
  res.send(users)
}
