import express from "express";
import {
  registerUser,
  login,
  getCurrentUser,
  refreshTokenController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
  logout,
  verifyResetOtpController
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyResetOtpSchema
} from "../validators/auth.validator.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  authLimiter,
  writeLimiter,
} from "../middlewares/rateLimit.middleware.js";
const authRouter = express.Router();

authRouter.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  registerUser,
);
authRouter.post("/login", authLimiter, validate(loginSchema), login);
authRouter.get("/me", authMiddleware, getCurrentUser);
authRouter.post("/refresh", authLimiter, refreshTokenController);
authRouter.post("/logout", authMiddleware, logout);
authRouter.patch(
  "/change-password",
  (req, res, next) => {
    
    next();
  },
  writeLimiter,
  authMiddleware,
  validate(changePasswordSchema),
  changePasswordController,
);
authRouter.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  forgotPasswordController,
);
authRouter.post(
  "/verify-reset-otp",
  authLimiter,
  validate(verifyResetOtpSchema),
  verifyResetOtpController
);
authRouter.post(
  "/reset-password",
  authLimiter,
  validate(resetPasswordSchema),
  resetPasswordController,
);
export default authRouter;
