import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/root';
import helmet from 'helmet';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { corsOptions } from './config/corsOptions';
import userRoutes from './routes/userRoutes';

dotenv.config();

const PORT: string | undefined = process.env.PORT;

if (!PORT) {
  console.error('Port is not defined. Make sure PORT is set in .env');
  process.exit(1);
}

const app: express.Express = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use('/users', userRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
