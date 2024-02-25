export interface JournalEntry {
  entry_id: number;
  user_id: number;
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
  daily_highlight?: string;
  created_at: string;
  updated_at: string;
}

export type JournalResponse = {
  success: boolean;
  data: JournalEntry[];
  message: string;
};
