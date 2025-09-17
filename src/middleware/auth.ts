import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { error } from '../utils/response';

interface JwtPayload {
    userId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(!token) return error(res, 'Unauthorized', 'Akses token diperlukan.', 401);

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY!) as JwtPayload
        (req as any).userId = decode.userId;
        next();
    } catch(err: any) {
        return error(res, 'Unauthorized', 'Akses token tidak valid', 401);
    }
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

        if(token) {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRETKEY!) as JwtPayload
                (req as any).userId = decode.userId;
            } catch(err: any) {
                return error(res, 'Unauthorized', 'Akses token tidak valid.', 401);
            }
        }
    next();
    
}