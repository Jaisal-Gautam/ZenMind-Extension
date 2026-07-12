import express from "express";
import {
  getPreferencesController,
  updatePreferencesController,
} from "../controllers/preference.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { preferenceSchema } from "../validators/preference.validator.js";
const prefRouter = express.Router();

prefRouter.get("/",authMiddleware,getPreferencesController);
prefRouter.patch("/",authMiddleware,validate(preferenceSchema),updatePreferencesController);


export default prefRouter;
