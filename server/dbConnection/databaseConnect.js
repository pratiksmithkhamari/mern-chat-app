import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
      const data = await mongoose.connect(process.env.MONGO_URL);
      console.log("db connected successful");
    } catch (error) {
      console.log("error in db connection", error.message);
    }
  };