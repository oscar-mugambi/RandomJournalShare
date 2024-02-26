import { createJournalEntry } from '@/api/journalService';
import { toast } from '@/components/ui/use-toast';
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast({
        title: 'Journal Submitted!',
        description: 'Your entry has been saved!',
      });
    },
    onError: (error: Error) => {
      console.error('Operation failed:', error);
    },
  });
}
