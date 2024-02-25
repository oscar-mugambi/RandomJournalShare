import { createJournalEntry } from '@/api/journalService';
import { JournalEntryMutationVariables } from '@/schemas/journalSchema';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export function useCreateJournalEntry(): UseMutationResult<
  any,
  Error,
  JournalEntryMutationVariables
> {
  return useMutation({
    mutationFn: ({ url, token, data, user_id }) =>
      createJournalEntry({ url, token, data, user_id }),
    onSuccess: (data) => {
      console.log('Operation successful:', data);
    },
    onError: (error: Error) => {
      console.error('Operation failed:', error);
    },
  });
}
