import { JournalResponse } from '@/types';
import { customFetch } from './customFetch';
import { JournalEntryMutationVariables } from '@/schemas/journalSchema';

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

export const deleteJournal = async (
  url: string,
  journalId: number,
  token: string
): Promise<void> => {
  try {
    const response = await customFetch(
      url,
      {
        method: 'DELETE',
        body: JSON.stringify({ entry_id: journalId }),
      },
      token
    );

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
  } catch (error) {
    console.error('Deletion failed:', error);
    throw error;
  }
};

export const createJournalEntry = async ({
  url,
  token,
  data,
  user_id,
}: JournalEntryMutationVariables) => {
  return customFetch(
    url,
    {
      method: 'POST',
      body: JSON.stringify({ ...data, user_id }),
    },
    token
  );
};
