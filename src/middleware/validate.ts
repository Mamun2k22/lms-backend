import type { Request, Response, NextFunction } from "express";
import type { ZodSchema, ZodTypeAny } from "zod";

type Part = "body" | "query" | "params";
type Schemas = Partial<Record<Part, ZodSchema<any>>>;

/** Validate req.body / req.query / req.params with zod schemas. */
export function validate(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      (["body", "query", "params"] as Part[]).forEach((part) => {
        const schema = schemas[part];
        if (schema) {
          const parsed = schema.parse((req as any)[part]);
          (req as any)[part] = parsed; // overwrite with parsed/sanitized values
        }
      });
      next();
    } catch (err: any) {
      // Let the global error handler format Zod errors
      next(err);
    }
  };
}
