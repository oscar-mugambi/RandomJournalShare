import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters',
  }),
});

export const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters',
  }),
});
