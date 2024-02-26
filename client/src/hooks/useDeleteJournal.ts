import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { deleteJournal } from '@/api/journalService';

interface DeleteRequestBody {
  journalId: number;
  url: string;
  token: string;
}

export function useDeleteJournal(): UseMutationResult<any, Error, DeleteRequestBody> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ url, journalId, token }: DeleteRequestBody) =>
      deleteJournal(url, journalId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
    },
    onError: (error: Error) => {
      console.error('Deletion failed:', error);
    },
  });
}
