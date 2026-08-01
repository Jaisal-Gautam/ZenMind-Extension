import { env } from "./env.js";
import mongoose from "mongoose";
export const connectDB = async () => {
    try{
        await mongoose.connect(env.MONGO_URI);
        
    }catch(e){
        console.error("DB Connection Error",e);
        process.exit(1);
    }
};