import express from "express";
import { getFocusHistoryController,startFocusSessionController,endFocusSessionController,getCurrentFocusSessionController } from "../controllers/focus.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate ,validateQuery} from "../middlewares/validate.middleware.js";
import { startFocusSchema,endFocusSchema } from "../validators/focus.validator.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";
import { paginationSchema } from "../validators/common.validator.js";


const focusRouter = express.Router();

focusRouter.post("/start",writeLimiter,authMiddleware,validate(startFocusSchema),startFocusSessionController);
focusRouter.post("/end",writeLimiter,authMiddleware,validate(endFocusSchema),endFocusSessionController);
focusRouter.get("/history",readLimiter,authMiddleware,validateQuery(paginationSchema),getFocusHistoryController);
focusRouter.get("/current",readLimiter,authMiddleware,getCurrentFocusSessionController)
export default focusRouter;
