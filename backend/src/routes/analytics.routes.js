import express from "express";
import { getOverviewController,getFocusAnalyticsController,getWebsiteAnalyticsController } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { readLimiter } from "../middlewares/rateLimit.middleware.js";
import { historySchema } from "../validators/analytics.validator.js";
import { getHistoryController } from "../controllers/analytics.controller.js";
import { validateQuery } from "../middlewares/validate.middleware.js"; 
const analyticRouter = express.Router();

analyticRouter.get("/overview",readLimiter,authMiddleware,getOverviewController);
analyticRouter.get("/websites",readLimiter,authMiddleware,getWebsiteAnalyticsController);
analyticRouter.get("/focus",readLimiter,authMiddleware,getFocusAnalyticsController);
analyticRouter.get(
    "/history",
    readLimiter,
    authMiddleware,
    validateQuery(historySchema),
    getHistoryController
);


export default analyticRouter;
