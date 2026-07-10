import express from "express";
import {
  getPreferencesController,
  updatePreferencesController,
} from "../controllers/preference.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const prefRouter = express.Router();

prefRouter.get("/",authMiddleware,getPreferencesController);
prefRouter.patch("/",authMiddleware,updatePreferencesController);


export default prefRouter;
