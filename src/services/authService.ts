import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export class AuthService {
  static async register(username: string, password: string, name: string) {
    
    const existing = await prisma.user.findUnique({ where: { username } });
    if(existing) throw new Error('Username sudah digunakan.');
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, name }
    });
    
    const token = generateToken(user.id);
    
    return { user, token };
  }
  
  static async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    
    if(!user) throw new Error('Username tidak ditemukan. ');
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new Error('Username atau Password salah.');
    
    const token = generateToken(user.id);
    
    return { user: { id: user.id, username: user.username, name: user.name }, token };
  }
}