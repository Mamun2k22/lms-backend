// src/middleware/error.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodIssue } from "zod";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      issues: err.issues.map((e: ZodIssue) => ({
        path: e.path.join("."),
        code: e.code,
        message: e.message,
      })),
    });
  }

  // Common Mongoose errors
  if (err?.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format", path: err.path, value: err.value });
  }
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: "Model validation failed",
      issues: Object.values(err.errors ?? {}).map((e: any) => e.message),
    });
  }

  const status = typeof err?.status === "number" ? err.status : 500;
  const message = err?.message || "Internal server error";
  res.status(status).json({ message });
}
