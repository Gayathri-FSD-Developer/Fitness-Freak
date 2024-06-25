import dotenv from "dotenv";
import mongoose from "mongoose";

// default function to call is to load environment variables from a .env file into the process.env object.
dotenv.config()

const DbConnection= async()=>{
    try {
        const ConnectionString = await mongoose.connect(process.env.MONGODBCONNECTIONSTRING)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Mongo DB not connected");
    }
}

export default DbConnection;