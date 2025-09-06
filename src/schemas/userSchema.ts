import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({ required_error: 'Username wajib diisi' }).min(4, 'Username minimal 4 huruf'),
  password: z.string({ required_error: 'Password wajib diisi' }).min(8, 'Password minimal 8 karakter'),
  name: z.string({ required_error: 'Name wajib diisi' }).min(5, 'Name minimal 5 huruf')
});

export const loginSchema = z.object({
  username: z.string({ required_error: 'Username wajib diisi.' }),
  password: z.string({ required_error: 'Password wajib diisi.' })
});
