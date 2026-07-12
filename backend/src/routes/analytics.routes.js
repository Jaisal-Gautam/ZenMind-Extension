import express from "express";
import { getOverviewController,getFocusAnalyticsController,getWebsiteAnalyticsController } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const analyticRouter = express.Router();

analyticRouter.get("/overview",authMiddleware,getOverviewController);
analyticRouter.get("/websites",authMiddleware,getWebsiteAnalyticsController);
analyticRouter.get("/focus",authMiddleware,getFocusAnalyticsController);



export default analyticRouter;
