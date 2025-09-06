import { Router } from 'express';
import { getMe, updateMe } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateMe);

export default router;