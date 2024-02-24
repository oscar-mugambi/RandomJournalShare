import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z.string().min(4, 'Password must be at least 4 characters long.'),
  }),
});

export const deleteUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z.string().min(4, 'Password must be at least 4 characters long.'),
  }),
});
