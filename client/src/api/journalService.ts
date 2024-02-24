import { JournalEntry } from '@/types';

export const fetchJournals = async (): Promise<JournalEntry[]> => {
  const response = await fetch('http://localhost:5000/journals');
  if (!response.ok) {
    let errorMessage = 'Error fetching journals';
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const deleteJournal = async (url: string, journalId: number): Promise<void> => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entry_id: journalId }),
  });
  if (!response.ok) {
    let errorMessage = 'Error deleting journal';
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
    throw new Error(errorMessage);
  }
};
