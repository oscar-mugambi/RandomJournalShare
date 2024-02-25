import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { query as db } from '../db';
import { checkIfJournalExists, checkIfUserExists } from '../db/dbHelpers';

export const getAllJournals = async (req: Request, res: Response) => {
  const journals = await db.query('SELECT * FROM journal_entries');

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
