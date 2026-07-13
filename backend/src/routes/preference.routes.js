import express from "express";
import {
  getPreferencesController,
  updatePreferencesController,
} from "../controllers/preference.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { preferenceSchema } from "../validators/preference.validator.js";
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";
const prefRouter = express.Router();

prefRouter.get("/",readLimiter,authMiddleware,getPreferencesController);
prefRouter.patch("/",writeLimiter,authMiddleware,validate(preferenceSchema),updatePreferencesController);


export default prefRouter;
