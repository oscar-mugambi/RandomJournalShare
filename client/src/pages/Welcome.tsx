import { useFetchJournals } from '@/hooks/useFetchJournals';
import JournalCard from '@/components/journal-card';
const entries = [
  {
    entry_id: 1,
    user_id: 101,
    title: 'A Trip to Remember',
    content: 'Today, I visited the old town. It brought back so many memories.',
    mood: '😊',
    tags: ['trip', 'memories', 'oldtown'],
    daily_highlight:
      "Revisiting my favorite bookstore and finding a rare edition of 'To Kill a Mockingbird'.",
    created_at: '2024-02-24T15:30:00Z',
    updated_at: '2024-02-24T15:30:00Z',
  },
  {
    entry_id: 2,
    user_id: 102,
    title: 'Overcoming Challenges',
    content: 'Faced some tough moments at work, but I learned a lot about resilience.',
    mood: '🤔',
    tags: ['work', 'challenges', 'learning'],
    daily_highlight: "Managed to solve a problem that's been bugging the team for weeks.",
    created_at: '2024-02-25T18:45:00Z',
    updated_at: '2024-02-25T18:45:00Z',
  },
  {
    entry_id: 3,
    user_id: 103,
    title: 'Quiet Reflections',
    content: "Spent the evening reflecting on personal goals and the direction I'm heading.",
    mood: '🌅',
    tags: ['reflection', 'personal', 'goals'],
    daily_highlight: 'Outlined my goals for the next five years.',
    created_at: '2024-02-26T21:00:00Z',
    updated_at: '2024-02-26T21:00:00Z',
  },
];

const Welcome = () => {
  const { data: journals } = useFetchJournals();
  console.log(journals);

  return (
    <div className='grid grid-cols-3 gap-8 px-10 mt-10'>
      {entries &&
        entries.map((journal) => <JournalCard key={journal.entry_id} journal={journal} />)}
    </div>
  );
};

export default Welcome;
