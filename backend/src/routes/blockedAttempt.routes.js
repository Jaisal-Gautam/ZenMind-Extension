import express from "express";
import {
  createBlockedAttemptController,
  getBlockedHistoryController,
} from "../controllers/blockedAttempt.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBlockedAttemptSchema } from "../validators/blockedAttempt.validator.js";

const blockedAttemptRouter = express.Router();

blockedAttemptRouter.post(
  "/attempt",
  authMiddleware,
  validate(createBlockedAttemptSchema),
  createBlockedAttemptController,
);
blockedAttemptRouter.get(
  "/history",
  authMiddleware,
  getBlockedHistoryController,
);

export default blockedAttemptRouter;
