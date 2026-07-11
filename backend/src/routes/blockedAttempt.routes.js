import express from "express";
import { createBlockedAttemptController,getBlockedHistoryController } from "../controllers/blockedAttempt.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const blockedAttemptRouter = express.Router();

blockedAttemptRouter.post("/attempt",authMiddleware,createBlockedAttemptController);
blockedAttemptRouter.get("/history",authMiddleware,getBlockedHistoryController);

export default blockedAttemptRouter;
