import { Pool, QueryResult } from 'pg';

const pool = new Pool();
export const query = {
  async query(sql: string, params?: any[]): Promise<QueryResult<any>> {
    return await pool.query(sql, params);
  },
};
