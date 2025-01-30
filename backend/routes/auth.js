import express from 'express';
import { signUp, logIn, getProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.get('/profile', protect, getProfile);
router.patch('/profile', protect, updateProfile);

export default router;