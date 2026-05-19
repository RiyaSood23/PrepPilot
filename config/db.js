<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/preppilot");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
>>>>>>> 4cf83678f732bf5bee2b41b847b35187daf38c88
  }
};

module.exports = connectDB;