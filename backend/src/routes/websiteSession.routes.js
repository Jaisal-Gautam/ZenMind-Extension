import express from "express";
import { createWebsiteSessionController,getWebsiteHistoryController } from "../controllers/websiteSession.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const websiteRouter = express.Router();

websiteRouter.post("/session",authMiddleware,createWebsiteSessionController);
websiteRouter.get("/history",authMiddleware,getWebsiteHistoryController);

export default websiteRouter;
