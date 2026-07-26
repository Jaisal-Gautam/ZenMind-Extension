import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/",readLimiter,authMiddleware,getDashboard)

export default dashboardRouter;