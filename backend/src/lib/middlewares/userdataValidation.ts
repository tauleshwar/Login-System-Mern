import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {

    const { success, error } = schema.safeParse(req.body);
    if (!success) {
      res.status(401).json({
        status: false,
        message: error.errors
          .map((t) => `${t.path[0] ?? ''}: ${t.message}`)
          .join(', '),
      });
      return;
    }

    next();
    return;
  };
};
