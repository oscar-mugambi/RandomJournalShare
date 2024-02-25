import { query as db } from '.';

export async function checkIfUserExists(column: 'user_id', value: number): Promise<boolean>;
export async function checkIfUserExists(
  column: 'username' | 'email',
  value: string
): Promise<boolean>;

export async function checkIfUserExists(column: string, value: string | number): Promise<boolean> {
  const query = `SELECT EXISTS (SELECT 1 FROM users WHERE ${column} = $1)`;
  const result = await db.query(query, [value]);
  return result.rows[0].exists;
}

export async function checkIfJournalExists(
  column: 'entry_id',
  value: string | number
): Promise<boolean>;

export async function checkIfJournalExists(
  column: string,
  value: string | number
): Promise<boolean> {
  const query = `SELECT EXISTS (SELECT 1 FROM journal_entries WHERE ${column} = $1)`;
  const result = await db.query(query, [value]);
  return result.rows[0].exists;
}
