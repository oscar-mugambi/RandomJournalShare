import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';

export const logActivity = async (activityMsg: string, activityLogName: string) => {
  const currentDateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logEntry = `${currentDateTime}\t${uuid()}\t${activityMsg}\n`;

  try {
    const logsDirPath = path.join(__dirname, '..', 'logs');
    const logFilePath = path.join(logsDirPath, activityLogName);

    if (!fs.existsSync(logsDirPath)) {
      await fsPromises.mkdir(logsDirPath);
    }
    await fsPromises.appendFile(logFilePath, logEntry);
  } catch (error) {
    console.error(error);
  }
};

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  logActivity(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  next();
};
