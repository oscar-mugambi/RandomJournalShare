import { Request, Response } from 'express';
import { query as db } from '../db';
import { checkIfJournalExists, checkIfUserExists } from '../db/dbHelpers';
import { RequestWithUser } from '../types';

export const getJournalEntry = async (req: RequestWithUser, res: Response) => {
  const email = req.user;

  if (!email) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const userIdObject = await db.query('SELECT user_id FROM users WHERE email = $1', [email]);

  if (userIdObject.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const user_id = userIdObject.rows[0].user_id;
  const { entry_id } = req.params;

  const journal = await db.query(
    'SELECT * FROM journal_entries WHERE entry_id = $1 AND user_id = $2',
    [entry_id, user_id]
  );

  if (journal.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: 'Journal not found',
    });
  }

  const journalEntry = journal.rows[0];

  if (journalEntry.tags && typeof journalEntry.tags === 'string') {
    try {
      journalEntry.tags = JSON.parse(journalEntry.tags);
    } catch (error) {
      console.error('Error parsing tags:', error);
      journalEntry.tags = [];
    }
  } else {
    journalEntry.tags = [];
  }

  res.status(200).json({
    success: true,
    data: journalEntry,
    message: 'Journal retrieved successfully',
  });
};
export const getAllJournals = async (req: RequestWithUser, res: Response) => {
  const email = req.user;

  if (!email) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const userIdObject = await db.query('SELECT user_id FROM users WHERE email = $1', [email]);

  if (userIdObject.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const user_id = userIdObject.rows[0].user_id;

  const journals = await db.query('SELECT * FROM journal_entries WHERE user_id = $1', [user_id]);

  if (journals.rowCount === 0) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'No journals found',
    });
  }

  res.status(200).json({
    success: true,
    data: journals.rows,
    message: 'Journals retrieved successfully',
  });
};

export const createJournal = async (req: Request, res: Response) => {
  const { user_id, content, title, mood, tags, daily_highlight } = req.body;

  const userExists = await checkIfUserExists('user_id', user_id);

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const journal = await db.query(
    `INSERT INTO journal_entries (user_id, title, content, mood, tags, daily_highlight, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *`,
    [user_id, title, content, mood, JSON.stringify(tags), daily_highlight]
  );

  if (!journal) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating your journal',
    });
  }

  if (journal.rowCount && journal.rowCount > 0) {
    res.status(201).json({
      success: true,
      data: journal.rows[0],
      message: 'Journal created successfully',
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating your journal',
    });
  }
};

export const deleteJournalEntry = async (req: Request, res: Response) => {
  const { entry_id } = req.body;
  console.log(entry_id);

  const journalExists = await checkIfJournalExists('entry_id', entry_id);

  if (!journalExists) {
    return res.status(404).json({
      success: false,
      message: 'Journal entry not found',
    });
  } else {
    const deletedJournal = await db.query(
      'DELETE FROM journal_entries WHERE entry_id = $1 RETURNING *',
      [entry_id]
    );

    if (deletedJournal && deletedJournal.rowCount && deletedJournal.rowCount > 0) {
      res.status(200).json({
        success: true,
        data: deletedJournal.rows[0],
        message: 'Journal entry deleted successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the journal entry',
      });
    }
  }
};

export async function getSharedJournalForRecipient(req: RequestWithUser, res: Response) {
  try {
    const recipientEmail = req.user;

    const userQueryResult = await db.query('SELECT user_id FROM users WHERE email = $1', [
      recipientEmail,
    ]);

    if (userQueryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const userId = userQueryResult.rows[0].user_id;

    const sharedJournalsQueryResult = await db.query(
      `SELECT je.* FROM shared_journal_entries sje
      JOIN journal_entries je ON sje.sender_entry_id = je.entry_id
      WHERE sje.receiver_user_id = $1 AND sje.delivery_status = 'success'`,
      [userId]
    );

    if (sharedJournalsQueryResult.rows.length === 0) {
      return res.status(404).json({ message: 'No shared journal entries found for the user.' });
    }

    return res.status(200).json({ sharedJournals: sharedJournalsQueryResult.rows });
  } catch (error) {
    console.error('Error fetching shared journal for recipient:', error);
    return res.status(500).json({ message: 'Error fetching shared journal entries.' });
  }
}
