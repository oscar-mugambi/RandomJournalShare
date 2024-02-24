import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchJournals } from '@/api/journalService';
import { JournalEntry } from '@/types/';

export const useFetchJournals = (): UseQueryResult<JournalEntry[], Error> => {
  return useQuery<JournalEntry[], Error>({
    queryKey: ['journals'],
    queryFn: fetchJournals,
  });
};
