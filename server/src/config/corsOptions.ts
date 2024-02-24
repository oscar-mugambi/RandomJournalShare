import { allowedOrigins } from './allowedOrigins';
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // origin is allowed
      callback(null, true);
    } else {
      // origin is not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
  // sets Access-Control-Allow-Credentials to true
  credentials: true,
  optionsSuccessStatus: 200,
};
