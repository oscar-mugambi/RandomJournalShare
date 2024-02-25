import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomJwtPayload } from '../types/custom-jwt-type';
import { RequestWithUser } from '../types';

dotenv.config();

export const verifyJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== 'string' || !authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: Error | null, decoded: string | undefined | JwtPayload) => {
      if (err) return res.status(403).json({ success: false, message: 'Forbidden' });
      const decodedPayload = decoded as CustomJwtPayload;
      req.user = decodedPayload.email;
      next();
    }
  );
};
