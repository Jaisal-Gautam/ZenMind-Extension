import express from "express";
import { getOverviewController,getFocusAnalyticsController,getWebsiteAnalyticsController } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { readLimiter } from "../middlewares/rateLimit.middleware.js";
const analyticRouter = express.Router();

analyticRouter.get("/overview",readLimiter,authMiddleware,getOverviewController);
analyticRouter.get("/websites",readLimiter,authMiddleware,getWebsiteAnalyticsController);
analyticRouter.get("/focus",readLimiter,authMiddleware,getFocusAnalyticsController);



export default analyticRouter;
