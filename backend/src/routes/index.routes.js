import { Router } from "express";
import { home,health } from "../controllers/index.controller.js";
const router = Router();

router.get("/", home );

router.get("/health",health);

export default router;