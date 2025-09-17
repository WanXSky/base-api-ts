import { Router } from 'express';
import { getMe, updateMe } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *  get:
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    summary: Profil Users
 *    description: Profil Users yang login
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 */
router.get('/me', authenticate, getMe);

/**
 * @swagger
 * /api/users/me:
 *  put:
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    summary: Update Profie Users
 *    description: Update Profile yang Sedang login
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - username
 *            properties:
 *              name:
 *                type: string
 *                example: John Doe
 *              username:
 *                type: string
 *                example: JohnDoe
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request | Username Sudah digunakan
 *      401:
 *        description: Unauthorized
 */
router.put('/me', authenticate, updateMe);

export default router;