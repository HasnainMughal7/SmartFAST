import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

export default connectDB;
