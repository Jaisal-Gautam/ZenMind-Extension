import express from "express";
import { getBlockingController,updateBlockingController,addSiteController,removeSiteController,addBlockedCategoryController,removeBlockedCategoryController,addTemporaryUnlockController,removeTemporaryUnlockController } from "../controllers/blocking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const blockingRouter = express.Router();

blockingRouter.get("/",authMiddleware,getBlockingController);

blockingRouter.patch("/",authMiddleware,updateBlockingController);

blockingRouter.post("/site",authMiddleware,addSiteController);
blockingRouter.delete("/site",authMiddleware,removeSiteController);

blockingRouter.post("/category",authMiddleware,addBlockedCategoryController);
blockingRouter.delete("/category",authMiddleware,removeBlockedCategoryController);

blockingRouter.post("/unlock",authMiddleware,addTemporaryUnlockController);
blockingRouter.delete("/unlock",authMiddleware,removeTemporaryUnlockController);

export default blockingRouter;
