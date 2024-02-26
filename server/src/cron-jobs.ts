import cron from 'node-cron';
import { logActivity } from './middleware/logger';
import { dispatchPendingEmails, registerPendingJournalEmails } from './db/journalSharing';

export const cronJobSendSharedJournalEmails = () => {
  cron.schedule(
    '0 12 * * *',
    async () => {
      logActivity('Scheduled task sendEmailsForSharedJournals started', 'mailLog.log');
      console.log('Scheduled task sendEmailsForSharedJournals started');
      await dispatchPendingEmails();
    },
    {
      scheduled: true,
      timezone: 'Africa/Nairobi',
    }
  );
};

export const cronJobPrepareJournalsForSharing = () => {
  cron.schedule(
    '57 11 * * *',
    async () => {
      logActivity('Scheduled task shareJournals started', 'mailLog.log');
      console.log('Scheduled task shareJournals started');
      await registerPendingJournalEmails();
    },
    {
      scheduled: true,
      timezone: 'Africa/Nairobi',
    }
  );
};
