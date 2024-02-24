import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const deleteUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});
