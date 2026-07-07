import { DB_CONNECT } from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
DB_CONNECT();
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);

});
