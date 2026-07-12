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

const authRouter = express.Router();

authRouter.post("/register",validate(registerSchema) ,registerUser);
authRouter.post("/login", validate(loginSchema),login);
authRouter.get("/me", authMiddleware, getCurrentUser);
authRouter.post('/refresh',refreshTokenController)
authRouter.post('/logout',authMiddleware,logout)

export default authRouter;
