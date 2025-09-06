import { generateSlug } from '../utils/generateSlug';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class NoteService {
  static async create(title: string, content: string, authorId: number, isPublic?: boolean | undefined) {
    let slug = generateSlug(title);
    const originalSlug = slug;
    let counter = 1;
    
    while(await prisma.note.findFirst({ where: { slug, authorId } })) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }
    
    return await prisma.note.create({
      data: {
        title,
        content,
        slug,
        isPublic,
        author: { connect: { id: authorId } }
      }
    });
  }
  
  static async getAll(username: string, viewerId: number | undefined) {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if(!user) throw new Error('Username tidak ditemukan.')
    
    const whereCondition = viewerId === user.id ? { authorId: user.id } : { authorId: user.id, isPublic: true }
    
    return await prisma.note.findMany({
      where: whereCondition,
      select: {
        title: true,
        slug: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true
      }, 
      orderBy: { createdAt: 'desc' }
    });
  }
  
  static async getByUserAndSlug(username: string, slug: string, viewerId?: number | undefined) {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if(!user) throw new Error('User tidak ditemukan.');
    const whereCondition = viewerId === user.id ?  { slug, author: { username }} : { slug, isPublic: true, author: { username } };
    const note = await prisma.note.findFirst({
      where: whereCondition,
      select: {
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
            name: true
          }
        }
      }
    });
    
    if(!note) throw new Error('Note tidak ditemukan.');
    return note;
  }
  
  static async update(slug: string, title: string, content: string, authorId: number, isPublic?: boolean | undefined) {
    const note = await prisma.note.findFirst({
      where: { slug, authorId }
    });
    if(!note) throw new Error('Notes atau Username tidak ada.');
    
    let newSlug = slug;
    if(title !== note.title) {
      newSlug = generateSlug(title);
      let original = newSlug;
      let counter = 1;
      while(await prisma.note.findFirst({
        where: { slug: newSlug, authorId }
      })) {
        newSlug = `${original}-${counter}`;
        counter++;
      }
    }
    
    return await prisma.note.update({
      where: { id: note.id },
      data: {
        title,
        slug: newSlug,
        content,
        isPublic
      }
    });
  }
  
  static async delete(slug: string, authorId: number) {
    const note = await prisma.note.findFirst({
      where: { slug, authorId },
    });
    if(!note) throw new Error('Note tidak ditemukan.');
    
    return await prisma.note.delete({
      where: { id: note.id }
    });
  }
  
}