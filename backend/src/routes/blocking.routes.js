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
import { writeLimiter,readLimiter } from "../middlewares/rateLimit.middleware.js";


const blockingRouter = express.Router();

blockingRouter.get("/",readLimiter,authMiddleware,getBlockingController);

blockingRouter.patch(
  "/",
  writeLimiter,
  authMiddleware,
  validate(updateBlockingSchema),
  updateBlockingController
);
blockingRouter.post("/site",writeLimiter,authMiddleware,validate(siteSchema),addSiteController);
blockingRouter.delete("/site",writeLimiter,authMiddleware,validate(siteSchema),removeSiteController);

blockingRouter.post("/category",writeLimiter,authMiddleware,validate(categorySchema),addBlockedCategoryController);
blockingRouter.delete("/category",writeLimiter,authMiddleware,validate(categorySchema),removeBlockedCategoryController);

blockingRouter.post("/unlock",writeLimiter,authMiddleware,validate(addTempSiteSchema),addTemporaryUnlockController);
blockingRouter.delete("/unlock",writeLimiter,authMiddleware,validate(removeTempSiteSchema),removeTemporaryUnlockController);

export default blockingRouter;
