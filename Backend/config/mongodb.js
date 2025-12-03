

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Doctor' // 👈 This sets the database name explicitly
    });

    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
  }
};

export default connectDB;