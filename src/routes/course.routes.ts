import { Router } from "express";
import { list, getBySlug, create, update, remove } from "../controllers/course.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  courseCreate,
  courseUpdate,
  byIdParams,
  bySlugParams,
} from "../schemas/index.js";

const router = Router();

// Public
router.get("/", list);
router.get("/:slug", validate({ params: bySlugParams }), getBySlug);

// Admin-only
router.post("/", requireAdmin, validate({ body: courseCreate }), create);
router.patch("/:id", requireAdmin, validate({ params: byIdParams, body: courseUpdate }), update);
router.delete("/:id", requireAdmin, validate({ params: byIdParams }), remove);

export default router;
