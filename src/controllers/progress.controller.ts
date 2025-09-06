import type { Request, Response } from "express";
import { completeAndNext } from "../services/progress.service.js";

const DEMO_USER_ID = "000000000000000000000001";

export async function complete(req: Request, res: Response) {
  const { courseId, lectureId } = req.body ?? {};
  if (!courseId || !lectureId) {
    return res.status(400).json({ message: "`courseId` and `lectureId` required" });
  }
  const data = await completeAndNext(DEMO_USER_ID, courseId, lectureId);
  res.json(data);
}
