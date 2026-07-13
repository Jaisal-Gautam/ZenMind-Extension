import express from "express";
import {
  createWebsiteSessionController,
  getWebsiteHistoryController,
} from "../controllers/websiteSession.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createWebSessionSchema } from "../validators/website.validator.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";

const websiteRouter = express.Router();

websiteRouter.post(
  "/session",
  writeLimiter,
  authMiddleware,
  validate(createWebSessionSchema),
  createWebsiteSessionController,
);
websiteRouter.get("/history",readLimiter, authMiddleware, getWebsiteHistoryController);

export default websiteRouter;
