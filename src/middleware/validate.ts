// src/middleware/validate.ts
import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

type Part = "body" | "query" | "params";
type Schemas = Partial<Record<Part, ZodSchema<any>>>;

declare global {
  namespace Express {
    interface Request {
      v?: {
        body?: any;
        params?: any;
        query?: any;
      };
    }
  }
}

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.v = req.v ?? {};

      if (schemas.body) {
        const body = schemas.body.parse(req.body);
        req.v.body = body;
        req.body = body;              // ✅ allowed to assign
      }

      if (schemas.params) {
        const params = schemas.params.parse(req.params);
        req.v.params = params;
        req.params = params;          // ✅ allowed to assign
      }

      if (schemas.query) {
        const query = schemas.query.parse(req.query);
        req.v.query = query;      
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
