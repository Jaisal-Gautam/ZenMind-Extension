import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export const DB_CONNECT = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully");
    }catch(e){
        console.log("DB Connection Error",e)
    }
};