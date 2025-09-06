import type { Request, Response } from "express";
import * as svc from "../services/module.service.js";

export async function list(req: Request, res: Response) {
  const course = req.query.course;
  if (typeof course !== "string" || !course) {
    return res.status(400).json({ message: "query param `course` is required" });
  }
  const data = await svc.listModules(course);
  res.json(data);
}

export async function create(req: Request, res: Response) {
  const created = await svc.createModule(req.body);
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  const updated = await svc.updateModule(id, req.body);
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "`id` param is required" });
  await svc.deleteModule(id);
  res.status(204).end();
}
