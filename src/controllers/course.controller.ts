import type { Request, Response } from "express";
import * as svc from "../services/course.service.js";

/** GET /courses */
export async function list(req: Request, res: Response) {
  const data = await svc.listCourses();
  res.json(data);
}

/** GET /courses/:slug */
export async function getBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  if (!slug) return res.status(400).json({ message: "`slug` param is required" });
  const course = await svc.getBySlug(slug);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
}

/** POST /courses */
export async function create(req: Request, res: Response) {
  const created = await svc.createCourse(req.body);
  res.status(201).json(created);
}

/** PATCH /courses/:id */
export async function update(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  const updated = await svc.updateCourse(id, req.body);
  res.json(updated);
}

/** DELETE /courses/:id */
export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  await svc.deleteCourse(id);
  res.status(204).end();
}
