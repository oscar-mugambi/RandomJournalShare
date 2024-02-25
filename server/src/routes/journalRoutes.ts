import express from 'express';
import {
  createJournal,
  deleteJournalEntry,
  getAllJournals,
  getJournalEntry,
  getSharedJournalForRecipient,
} from '../controller/journalController';
import { validateResource } from '../middleware/validateResource';
import {
  createJournalSchema,
  deleteJournalSChema,
  getJournalSchema,
} from '../schema/journalSchema';
import { verifyJWT } from '../middleware/verifyJWT';
const router = express.Router();

router.use(verifyJWT);

router.route('/:entry_id').get(validateResource(getJournalSchema), getJournalEntry);
router.route('/shared-entry').get(getSharedJournalForRecipient);

router
  .route('/')
  .get(getAllJournals)
  .post(validateResource(createJournalSchema), createJournal)
  .delete(validateResource(deleteJournalSChema), deleteJournalEntry);

export default router;
