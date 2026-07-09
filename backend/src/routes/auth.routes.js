import express from "express";
import {
  registerUser,
  login,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, getCurrentUser);

export default authRouter;
