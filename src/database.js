import mongoose from "mongoose";

export const connect = () => {
  return mongoose
    .connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
    })
    .then(db => console.log("🔌 MongoDB connection successful"))
    .catch(err => console.log("💥 Fail to connect MongoDB"))
}