import { useAppSelector } from '@/app/store';
import { formatter } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const JournalPage = () => {
  const token = useAppSelector((state) => state.auth?.token);
  async function fetchJournal() {
    const response = await fetch(`http://localhost:5000/journals/${journalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  }

  const { journalId } = useParams();
  const { data: journal } = useQuery({
    queryKey: ['journal', journalId],
    queryFn: fetchJournal,
    select: (data) => {
      return data.data;
    },
  });
  if (!journal?.entry_id) {
    return <div>No journals</div>;
  }
  let tagsArray: string[] = ['general'];

  if (journal.tags.length && Array.isArray(journal.tags)) {
    tagsArray = journal.tags;
  } else if (journal.tags.length && typeof journal.tags === 'string') {
    tagsArray = journal.tags.split(',');
  }

  return (
    <div className='min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <h1 className='text-4xl font-bold text-white text-center my-10 drop-shadow-lg'>
        Journal Entry
      </h1>
      <div className='bg-white/90 backdrop-blur-lg rounded-lg shadow-xl mb-8 p-6 mx-auto max-w-2xl'>
        <h2 className='text-2xl font-bold text-gray-800'>{journal.title}</h2>
        <div
          className='text-gray-800 text-lg mb-3'
          dangerouslySetInnerHTML={{ __html: journal.content }}
        />

        <div className='flex flex-wrap gap-2 mt-4 justify-between'>
          <div>
            {tagsArray.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className='text-xs font-medium bg-green-200 text-green-800 py-1 px-2 rounded-full'
              >
                #{tag}
              </span>
            ))}
          </div>
          <span className='text-sm font-medium text-gray-600'>
            {formatter.format(new Date(journal.created_at))}{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
