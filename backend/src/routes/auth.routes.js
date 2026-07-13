import express from "express";
import {
  registerUser,
  login,
  getCurrentUser,
  refreshTokenController,
  logout
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema,registerSchema } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
const authRouter = express.Router();

authRouter.post("/register",authLimiter,validate(registerSchema) ,registerUser);
authRouter.post("/login",authLimiter, validate(loginSchema),login);
authRouter.get("/me", authMiddleware, getCurrentUser);
authRouter.post('/refresh',authLimiter,refreshTokenController)
authRouter.post('/logout',authMiddleware,logout)

export default authRouter;
