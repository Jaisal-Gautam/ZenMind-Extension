import express from "express";
import {
  createBlockedAttemptController,
  getBlockedHistoryController,
} from "../controllers/blockedAttempt.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate ,validateQuery} from "../middlewares/validate.middleware.js";
import { createBlockedAttemptSchema } from "../validators/blockedAttempt.validator.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";
import { paginationSchema } from "../validators/common.validator.js";
const blockedAttemptRouter = express.Router();

blockedAttemptRouter.post(
  "/attempt",
  writeLimiter,
  authMiddleware,
  validate(createBlockedAttemptSchema),
  createBlockedAttemptController,
);
blockedAttemptRouter.get(
  "/history",writeLimiter,
  authMiddleware,
  validateQuery(paginationSchema),
  getBlockedHistoryController,
);

export default blockedAttemptRouter;
