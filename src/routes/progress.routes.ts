import { Router } from "express";
import { complete } from "../controllers/progress.controller.js";

const router = Router();

// User progress (public for now, real project → user auth)
router.post("/complete", complete);

export default router;
