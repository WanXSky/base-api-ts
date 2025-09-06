// src/schemas/noteSchema.ts
import { z } from 'zod';

export const createSchema = z.object({
  title: z
    .string({ message: 'Title wajib diisi' })
    .min(5, { message: 'Title minimal 5 karakter' }), // ✅ fixed
  content: z
    .string({ message: 'Content wajib diisi' })
    .min(10, { message: 'Content minimal 10 karakter' }), // ✅ fixed
  isPublic: z.boolean().optional().default(false)
});

export const updateSchema = z.object({
  title: z
    .string({ message: 'Title wajib diisi' })
    .min(5, { message: 'Title minimal 5 karakter' }),
  content: z
    .string({ message: 'Content wajib diisi' })
    .min(10, { message: 'Content minimal 10 karakter' }),
  isPublic: z.boolean().optional().default(false)
});