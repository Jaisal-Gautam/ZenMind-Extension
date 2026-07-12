import express from "express";
import {
  createWebsiteSessionController,
  getWebsiteHistoryController,
} from "../controllers/websiteSession.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createWebSessionSchema } from "../validators/website.validator.js";

const websiteRouter = express.Router();

websiteRouter.post(
  "/session",
  authMiddleware,
  validate(createWebSessionSchema),
  createWebsiteSessionController,
);
websiteRouter.get("/history", authMiddleware, getWebsiteHistoryController);

export default websiteRouter;
