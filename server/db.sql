CREATE DATABASE random_journal;



CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE journal_entries (
  entry_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);




CREATE TABLE shared_journal_entries (
  shared_entry_id SERIAL PRIMARY KEY,
  sender_entry_id INT NOT NULL,
  receiver_user_id INT NOT NULL,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_entry_id) REFERENCES journal_entries(entry_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
