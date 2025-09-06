import { Router } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import noteRoute from './noteRoute'

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/notes', noteRoute);

export default router;