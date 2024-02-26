import { z } from 'zod';

export const journalEntrySchema = z.object({
  content: z.string().trim().max(500, { message: 'Field must not exceed 500 characters' }),
  title: z.string().max(50, 'Title must not exceed 50 characters').trim(),
  mood: z.string().optional(),
  tags: z.string().optional(),
});

export type JournalEntryT = z.infer<typeof journalEntrySchema>;
export type JournalEntryMutationVariables = {
  url: string;
  token: string;
  data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[] | string | undefined;
  };
  user_id: number;
};
