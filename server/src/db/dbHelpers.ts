import { query as db } from '.';

export async function checkIfExists(column: string, value: string): Promise<boolean> {
  const query = `SELECT EXISTS (SELECT 1 FROM users WHERE ${column} = $1)`;
  const result = await db.query(query, [value]);
  return result.rows[0].exists;
}
