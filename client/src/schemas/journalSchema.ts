import { z } from 'zod';

export const journalEntrySchema = z.object({
  content: z.string().max(500, 'Content must not exceed 500 characters').trim(),
  title: z.string().max(255, 'Title must not exceed 255 characters').trim(),
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
