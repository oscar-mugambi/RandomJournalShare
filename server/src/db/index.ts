import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool();

export const query = {
  async query<T extends QueryResultRow>(sql: string, params?: any[]): Promise<QueryResult<T>> {
    return pool.query<T>(sql, params);
  },
};
