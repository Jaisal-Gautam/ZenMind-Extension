import express from "express";
import { getBlockingController,updateBlockingController,addSiteController,removeSiteController,addBlockedCategoryController,removeBlockedCategoryController,addTemporaryUnlockController,removeTemporaryUnlockController } from "../controllers/blocking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  updateBlockingSchema,
  siteSchema,
  categorySchema,
  addTempSiteSchema,
  removeTempSiteSchema,
} from "../validators/blocking.validator.js";

const blockingRouter = express.Router();

blockingRouter.get("/",authMiddleware,getBlockingController);

blockingRouter.patch("/",authMiddleware,validate(updateBlockingController),updateBlockingController);

blockingRouter.post("/site",authMiddleware,validate(siteSchema),addSiteController);
blockingRouter.delete("/site",authMiddleware,validate(siteSchema),removeSiteController);

blockingRouter.post("/category",authMiddleware,validate(categorySchema),addBlockedCategoryController);
blockingRouter.delete("/category",authMiddleware,validate(categorySchema),removeBlockedCategoryController);

blockingRouter.post("/unlock",authMiddleware,validate(addTempSiteSchema),addTemporaryUnlockController);
blockingRouter.delete("/unlock",authMiddleware,validate(removeTempSiteSchema),removeTemporaryUnlockController);

export default blockingRouter;
