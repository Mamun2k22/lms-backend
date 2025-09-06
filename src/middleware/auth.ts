import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const raw = req.headers.authorization;
  if (!raw?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = raw.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
