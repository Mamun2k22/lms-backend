import { Router } from "express";
import * as ctrl from "../controllers/module.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  moduleCreate,
  moduleUpdate,
  byIdParams,
  byCourseQuery,
} from "../schemas/index.js";

const router = Router();

/** List modules (optionally by course) */
router.get("/", validate({ query: byCourseQuery }), ctrl.list);

/** Admin-only create/update/delete */
router.post("/", requireAdmin, validate({ body: moduleCreate }), ctrl.create);
router.patch("/:id", requireAdmin, validate({ params: byIdParams, body: moduleUpdate }), ctrl.update);
router.delete("/:id", requireAdmin, validate({ params: byIdParams }), ctrl.remove);

export default router;
