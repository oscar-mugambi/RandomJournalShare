import { z } from 'zod';

export const createJournalSchema = z.object({
  body: z.object({
    user_id: z.number(),
  }),
});

export const deleteJournalSChema = z.object({
  body: z.object({
    user_id: z.number(),
  }),
});
