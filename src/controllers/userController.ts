import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getMe = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, name: true, createdAt: true}
    });

    if (!user) return error(res, null, 'User tidak ditemukan', 404);
    
    return success(res, user, `Selamat datang ${user.name}`, 200);
};

export const updateMe = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { name, username } = req.body;
    
    if(!username) {
      return error(res, null, 'Username wajib diisi.', 400)
    };

    try {
        const user = await prisma.user.update({
            where: { id: userId},
            data: { name, username },
            select: { id: true, username: true, name: true }
        });
        return success(res, user, 'Berhasil perbarui.', 200);
    } catch(err: any) {
        if(err.code === 'P2002') {
            return error(res, null, 'Username sudah digunakan.', 400)
        } else {
            return error(res, null, 'Gagal perbarui user.', 500)
        }
     }
};