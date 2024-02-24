import { Request, Response, NextFunction } from 'express';
import { logActivity } from './logger';
export const errorHandler = (err: Error, req: Request, res: Response) => {
  logActivity(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({ message: err.message });
};
