import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "MONGO_URI is missing. Server will run without database connection."
    );
    return false;
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
  return true;
};

export default connectDB;
