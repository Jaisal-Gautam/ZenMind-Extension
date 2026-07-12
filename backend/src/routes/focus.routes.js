import express from "express";
import { getFocusHistoryController,startFocusSessionController,endFocusSessionController } from "../controllers/focus.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { startFocusSchema,endFocusSchema } from "../validators/focus.validator.js";

const focusRouter = express.Router();

focusRouter.post("/start",authMiddleware,validate(startFocusSchema),startFocusSessionController);
focusRouter.post("/end",authMiddleware,validate(endFocusSchema),endFocusSessionController);
focusRouter.get("/history",authMiddleware,getFocusHistoryController);

export default focusRouter;
