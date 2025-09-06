import { Request, Response } from 'express';
import { success, error } from '../utils/response';
import { AuthService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { username, name, password } = req.body;

    try {
        const result = await AuthService.register(username, password, name)
        
        return success(res, result, 'Register berhasil', 201);
    } catch(err: any) {
        console.error(err.message);
        return error(res, 'Internal Server Error', err.message, 400)
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const result = await AuthService.login(username, password);
      return success(res, result, 'Login berhasil', 200);
    } catch(err: any) {
      console.error(err.message)
      return error(res, 'Internal Server Error', err.message, 401);
    }
};