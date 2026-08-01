// Dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
//Middlewares
import { errorHandler } from "./middlewares/error.middleware.js";
import { corsOptions } from "./utils/cors.js";

//Routes
import router from "./routes/index.routes.js";
import authRouter from "./routes/auth.routes.js";
import prefRouter from "./routes/preference.routes.js";
import blockingRouter from "./routes/blocking.routes.js";
import focusRouter from "./routes/focus.routes.js";
import websiteRouter from "./routes/websiteSession.routes.js";
import blockedAttemptRouter from "./routes/blockedAttempt.routes.js";
import analyticRouter from "./routes/analytics.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
//App
const app = express();
app.set("trust proxy", 1);
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));

//Routes
app.use("/", router);
app.use("/auth", authRouter)
app.use("/preferences", prefRouter)
app.use("/blocking", blockingRouter)
app.use("/focus", focusRouter)
app.use("/website", websiteRouter)
app.use("/blocked", blockedAttemptRouter)
app.use("/analytics", analyticRouter)
app.use("/dashboard", dashboardRouter)

app.use(errorHandler);
export default app;
