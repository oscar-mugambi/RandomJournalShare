import { JournalResponse } from '@/types';
import { customFetch } from './customFetch';

export const fetchJournals = async (token: string): Promise<JournalResponse> => {
  try {
    const response = await customFetch(
      '/journals',
      {
        method: 'GET',
      },
      token
    );

    const results = response.json();
    return results;
  } catch (error) {
    console.error('Error fetching journals:', error);
    throw new Error(typeof error === 'string' ? error : 'Error fetching journals');
  }
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
