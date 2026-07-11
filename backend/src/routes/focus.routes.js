import express from "express";
import { getFocusHistoryController,startFocusSessionController,endFocusSessionController } from "../controllers/focus.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const focusRouter = express.Router();

focusRouter.post("/start",authMiddleware,startFocusSessionController);
focusRouter.post("/end",authMiddleware,endFocusSessionController);
focusRouter.get("/history",authMiddleware,getFocusHistoryController);

export default focusRouter;
