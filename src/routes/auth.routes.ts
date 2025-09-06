import { Router } from "express";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const r = Router();

r.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    return res.json({ token, role: "admin", expiresIn: "1d" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default r;
