import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { error } from '../utils/response';

export const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch(err: any) {
            if (err instanceof ZodError) {
                const messages = err.issues.map((issue: ZodIssue) => issue.message);
                const message = messages.join(', ');
                return error(res, 'Bad Request', message, 400);
            }

            return error(res, 'Invalid Request data', '', 400);
        }
    }
}