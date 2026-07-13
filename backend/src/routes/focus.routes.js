import express from "express";
import { getFocusHistoryController,startFocusSessionController,endFocusSessionController } from "../controllers/focus.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { startFocusSchema,endFocusSchema } from "../validators/focus.validator.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";


const focusRouter = express.Router();

focusRouter.post("/start",writeLimiter,authMiddleware,validate(startFocusSchema),startFocusSessionController);
focusRouter.post("/end",writeLimiter,authMiddleware,validate(endFocusSchema),endFocusSessionController);
focusRouter.get("/history",readLimiter,authMiddleware,getFocusHistoryController);

export default focusRouter;
