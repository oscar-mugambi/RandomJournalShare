import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { logActivity } from './logger';

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many login attempts, please try again later.',
  handler: (req: Request, res: Response, _next: Function, options: any) => {
    logActivity(
      `Too Many Requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLog.log'
    );
    res.status(options.statusCode).json({
      success: false,
      message: options.message,
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
