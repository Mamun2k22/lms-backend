import type { Request, Response } from "express";
import * as svc from "../services/lecture.service.js";

/** GET /lectures?module=<moduleId>  OR  /lectures?course=<courseId> */
export async function list(req: Request, res: Response) {
  const { module: moduleQ, course } = req.query;

  if (typeof moduleQ === "string" && moduleQ) {
    const data = await svc.listLectures({ moduleId: moduleQ });
    return res.json(data);
  }

  if (typeof course === "string" && course) {
    const data = await svc.listLectures({ courseId: course });
    return res.json(data);
  }

  return res
    .status(400)
    .json({ message: "query param `module` or `course` is required" });
}

export async function create(req: Request, res: Response) {
  const { moduleId, title, videoUrl, pdfs } = req.body ?? {};
  if (!moduleId || !title || !videoUrl) {
    return res
      .status(400)
      .json({ message: "`moduleId`, `title`, `videoUrl` required" });
  }
  const created = await svc.createLecture({ moduleId, title, videoUrl, pdfs });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  const updated = await svc.updateLecture(id, req.body);
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  await svc.deleteLecture(id);
  res.status(204).end();
}
