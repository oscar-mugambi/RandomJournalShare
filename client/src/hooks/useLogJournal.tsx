import { createJournalEntry } from '@/api/journalService';
import { JournalEntryMutationVariables } from '@/schemas/journalSchema';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

export function useCreateJournalEntry(): UseMutationResult<
  any,
  Error,
  JournalEntryMutationVariables
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ url, token, data, user_id }) =>
      createJournalEntry({ url, token, data, user_id }),
    onSuccess: (data) => {
      console.log('Operation successful:', data);
      queryClient.invalidateQueries(['journals']);
    },
    onError: (error: Error) => {
      console.error('Operation failed:', error);
    },
  });
}
