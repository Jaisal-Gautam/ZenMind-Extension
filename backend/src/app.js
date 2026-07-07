// Dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
//Middlewares
import { limiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
//Routes
import router from "./routes/index.routes.js";

//App
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);
app.use(errorHandler)

app.use("/",router);

export default app;