import * as jwt from 'jsonwebtoken';


export const generateToken = (userId: number): string => {
    return jwt.sign({ userId}, process.env.JWT_SECRET!, { expiresIn: '1d'});
};