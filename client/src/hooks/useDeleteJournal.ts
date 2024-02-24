import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { deleteJournal } from '@/api/journalService';

interface DeleteRequestBody {
  journalId: number;
  url: string;
}

export function useDeleteJournal(): UseMutationResult<any, Error, DeleteRequestBody> {
  return useMutation({
    mutationFn: ({ url, journalId }: DeleteRequestBody) => deleteJournal(url, journalId),
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}
