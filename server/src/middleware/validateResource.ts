import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export const validateResource =
  (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: e.errors,
        });
      } else {
        console.error(e);
        return res.status(500).json({
          success: false,
          message: 'An unexpected error occurred while validating the resource',
        });
      }
    }
  };
