import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { corsOptions } from './config/corsOptions';
import userRoutes from './routes/userRoutes';
import journalRoutes from './routes/journalRoutes';
import authRoutes from './routes/authRoutes';
import { cronJobSendSharedJournalEmails, cronJobPrepareJournalsForSharing } from './cron-jobs';

dotenv.config();

const PORT: string | undefined = process.env.PORT;

if (!PORT) {
  console.error('Port is not defined. Make sure PORT is set in .env');
  process.exit(1);
}

cronJobSendSharedJournalEmails();
cronJobPrepareJournalsForSharing();

const app: express.Express = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health-check', (_req: Request, res: Response) => {
  console.log('health-check');
  return res.status(200).send('OK');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ message: '404 Route Not Found' });
  } else {
    res.type('txt').send('404 Route Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/**
 * Left this here for testing purposes
 */
// import { Resend } from 'resend';
// import { dispatchPendingEmails, registerPendingJournalEmails } from './db/journalSharing';

// const resend = new Resend(process.env.RESEND_API_KEY);
// app.get('/resend', async (_req: Request, res: Response) => {
//   const { error, data } = await resend.emails.send({
//     from: 'Journal Random: <onboarding@code.cosmicpenguin.xyz>',
//     to: 'oscar.mugambi@ajua.com',
//     subject: `Random Journal Entry`,
//     html: '<span>entry.content<span>',
//   });

//   return res.json({ error, data });
// });
