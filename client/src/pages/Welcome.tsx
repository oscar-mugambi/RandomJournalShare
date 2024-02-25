import JournalCard from '@/components/journal-card';
import { useAppSelector } from '@/app/store';
import { useQuery } from '@tanstack/react-query';
import { JournalResponse } from '@/types';
import { fetchJournals } from '@/api/journalService';

const Welcome = () => {
  const token = useAppSelector((state) => state.auth?.token);

  const { data: entries } = useQuery<JournalResponse, Error>({
    queryKey: ['journals'],
    queryFn: () => fetchJournals(token),
    enabled: !!token,
  });

  return (
    <div className='grid grid-cols-3 gap-8 px-10 mt-10'>
      {entries &&
        entries.data.map((journal) => <JournalCard key={journal.entry_id} journal={journal} />)}
    </div>
  );
};

export default Welcome;
