import { QueryResult } from 'pg';
import { query as db } from './db';
import cron from 'node-schedule';
import { logActivity } from './middleware/logger';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type JournalEntry = {
  entry_id: number;
  user_id: number;
};

/*
 Shuffle the array using the Fisher-Yates shuffle algorithm, which is an efficient
 way to randomly rearrange an array in O(n) time complexity.
 Details can be found here: https://javascript.info/task/shuffle
*/
function shuffle(array: JournalEntry[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function registerPendingJournalEmails() {
  const { rows }: QueryResult<JournalEntry> = await db.query<JournalEntry>(
    `SELECT DISTINCT ON (user_id) entry_id, user_id
     FROM journal_entries
     WHERE created_at > NOW() - INTERVAL '24 hours'
     ORDER BY user_id, created_at DESC`
  );

  if (rows.length === 0) {
    console.log('No journals found in the last 24 hours');
    logActivity('No journals found in the last 24 hours:', 'mailLog.log');
    return;
  }

  const shuffledJournals = shuffle(rows);

  const shareJournalsPromises = shuffledJournals.map((journal, idx, shuffledArr) => {
    const receiverIdx = (idx + 1) % shuffledArr.length;
    const receiverUserId = shuffledArr[receiverIdx].user_id;

    return db.query(
      'INSERT INTO shared_journal_entries (sender_entry_id, receiver_user_id) VALUES ($1, $2)',
      [journal.entry_id, receiverUserId]
    );
  });

  await Promise.all(shareJournalsPromises);
  logActivity('Journals are ready to be shared', 'mailLog.log');
  console.log('Journals are ready to be shared');
}

async function dispatchPendingEmails() {
  const fetchPendingEntriesSQL = `SELECT sje.shared_entry_id, sje.sender_entry_id, sje.receiver_user_id, je.content, je.title, u.email
  FROM shared_journal_entries sje
  JOIN journal_entries je ON sje.sender_entry_id = je.entry_id
  JOIN users u ON sje.receiver_user_id = u.user_id
  WHERE sje.delivery_status = 'pending'
  AND sje.created_at > NOW() - INTERVAL '24 hours';
  `;

  const { rows } = await db.query(fetchPendingEntriesSQL);

  for (let entry of rows) {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: entry.email,
        subject: `Random Journal Entry: ${entry.title}`,
        html: entry.content,
      });

      const updateStatusSQL = `
      UPDATE shared_journal_entries
      SET delivery_status = 'success'
      WHERE shared_entry_id = $1;
      `;
      await db.query(updateStatusSQL, [entry.shared_entry_id]);

      logActivity(
        `Email successfully sent to ${entry.email} for shared_entry_id: ${entry.shared_entry_id}`,
        'mailLog.log'
      );
      console.log(
        `Email successfully sent to ${entry.email} for shared_entry_id: ${entry.shared_entry_id}`
      );
    } catch (error) {
      console.error(`Failed to send email for shared_entry_id: ${entry.shared_entry_id}`, error);
      logActivity(
        `Failed to send email for shared_entry_id: ${entry.shared_entry_id}`,
        'mailLog.log'
      );
      const updateFailedStatusSQL = `
        UPDATE shared_journal_entries
        SET delivery_status = 'failed'
        WHERE shared_entry_id = $1;
        `;
      await db.query(updateFailedStatusSQL, [entry.shared_entry_id]);
    }
  }
}

cron.scheduleJob('0 12 * * *', () => {
  logActivity('Scheduled task sendEmailsForSharedJournals started', 'mailLog.log');
  console.log('Scheduled task sendEmailsForSharedJournals started');
  dispatchPendingEmails();
});

cron.scheduleJob('57 11 * * *', () => {
  logActivity('Scheduled task shareJournals started', 'mailLog.log');
  console.log('Scheduled task shareJournals started');
  registerPendingJournalEmails();
});
