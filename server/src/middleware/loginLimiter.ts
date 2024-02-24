import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { logActivity } from './logger';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: 'Too many login attempts, please try again later.',
  },
  handler: (req: Request, res: Response, _next: Function, options: any) => {
    logActivity(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLog.log'
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
