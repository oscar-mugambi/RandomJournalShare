import JournalCard from '@/components/journal-card';
import { useAppSelector } from '@/app/store';
import { useQuery } from '@tanstack/react-query';
import { JournalResponse } from '@/types';
import { fetchJournals } from '@/api/journalService';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const token = useAppSelector((state) => state.auth?.token);
  const navigate = useNavigate();

  const { data: entries, isSuccess } = useQuery<JournalResponse, Error>({
    queryKey: ['journals'],
    queryFn: () => fetchJournals(token),
    enabled: !!token,
  });

  const hasEntries = isSuccess && entries && entries.data.length > 0;

  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10'>
      {hasEntries ? (
        <div className='grid grid-cols-3 gap-8'>
          {entries.data.map((journal) => (
            <JournalCard key={journal.entry_id} journal={journal} />
          ))}
        </div>
      ) : (
        <div className='mt-52'>
          <div className='flex flex-col items-center justify-center text-center text-white space-y-4 w-full px-4'>
            <h2 className='text-4xl font-bold drop-shadow-md'>No Journals Yet</h2>
            <p className='text-xl'>Your personal journal awaits your first entry.</p>
            <button
              onClick={() => navigate('/home/journals/new')}
              className='mt-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-200'
            >
              Start Journaling
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
