import { Router } from "express";
import * as ctrl from "../controllers/lecture.controller.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  lectureCreate,
  lectureUpdate,
  byIdParams,
  lectureListQuery,
} from "../schemas/index.js";

const router = Router();

/** List lectures (?course=<id> or ?module=<id>) */
router.get("/", validate({ query: lectureListQuery }), ctrl.list);

/** Admin-only create/update/delete */
router.post("/", requireAdmin, validate({ body: lectureCreate }), ctrl.create);
router.patch("/:id", requireAdmin, validate({ params: byIdParams, body: lectureUpdate }), ctrl.update);
router.delete("/:id", requireAdmin, validate({ params: byIdParams }), ctrl.remove);

export default router;

