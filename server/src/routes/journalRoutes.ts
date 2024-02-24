import express from 'express';
import { createJournal, deleteJournalEntry, getAllJournals } from '../controller/journalController';
import { validateResource } from '../middleware/validateResource';
import { createJournalSchema, deleteJournalSChema } from '../schema/journalSchema';
const router = express.Router();

router
  .route('/')
  .get(getAllJournals)
  .post(validateResource(createJournalSchema), createJournal)
  .delete(validateResource(deleteJournalSChema), deleteJournalEntry);

export default router;
