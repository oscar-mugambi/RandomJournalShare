export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserExists {
  user_id: number;
  username: string;
  email: string;
}

export type GetAllUserDataType = {
  email: string;
  username: string;
};

export type CreateNewUser = {
  username: string;
  email: string;
  password?: string;
  user_id: string;
};
