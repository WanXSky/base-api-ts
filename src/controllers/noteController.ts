// src/controllers/noteController.ts
import { Request, Response } from 'express';
import { error, success } from '../utils/response';
import { NoteService } from '../services/noteService';

// ✅ CREATE
export const createNote = async (req: Request, res: Response) => {
  const { title, content, isPublic } = req.body;
  const authorId = (req as any).userId;

  try {
    const result = await NoteService.create(title, content, authorId, isPublic);
    return success(res, result, 'Catatan baru berhasil dibuat', 201);
  } catch (err: any) {
    console.error('[CreateNote Error]', err.message);
    return error(res, null, err.message, 400);
  }
};

// ✅ READ: Semua catatan user
export const readAllNote = async (req: Request, res: Response) => {
  const { username } = req.params;
  const viewerId = (req as any).userId;

  try {
    const result = await NoteService.getAll(username, viewerId);
    return success(res, result, 'Daftar catatan berhasil diambil', 200);
  } catch (err: any) {
    console.error('[ReadAllNote Error]', err.message);
    return error(res, null, err.message, 404);
  }
};

// ✅ READ: 1 catatan
export const readNote = async (req: Request, res: Response) => {
  const { username, slug } = req.params;
  const viewerId = (req as any).userId;

  try {
    const result = await NoteService.getByUserAndSlug(username, slug, viewerId);
    return success(res, result, 'Berhasil mendapatkan catatan', 200);
  } catch (err: any) {
    console.error('[ReadNote Error]', err.message);
    return error(res, null, err.message, 404);
  }
};

// ✅ UPDATE
export const updateNote = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { title, content, isPublic } = req.body;
  const authorId = (req as any).userId;

  try {
    const result = await NoteService.update(slug, title, content, authorId, isPublic);
    return success(res, result, 'Catatan berhasil diperbarui', 200);
  } catch (err: any) {
    console.error('[UpdateNote Error]', err.message);
    return error(res, null, err.message, 400);
  }
};

// ✅ DELETE
export const deleteNote = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const authorId = (req as any).userId;

  try {
    await NoteService.delete(slug, authorId);
    return success(res, null, 'Catatan berhasil dihapus', 200);
  } catch (err: any) {
    console.error('[DeleteNote Error]', err.message);
    return error(res, null, err.message, 400);
  }
};