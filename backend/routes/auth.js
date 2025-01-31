import express from 'express';
import { signUp, logIn, getProfile, updateProfile } from '../controllers/auth.js';
import { checkToken } from '../middleware/checkToken.js';
const router = express.Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.get('/profile',checkToken, getProfile);
router.patch('/profile',checkToken, updateProfile);

export default router;