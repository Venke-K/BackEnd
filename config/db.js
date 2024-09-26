import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;
const URL = `${MONGODB_URL}${MONGODB_DB}`;

console.log("Connecting to MongoDB at:", URL);

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Mongo Connection established");
  } catch (error) {
    console.error("Error connecting to Mongo", error);
    process.exit(1); // Exit process with failure=
  }
};

export default connectDB;