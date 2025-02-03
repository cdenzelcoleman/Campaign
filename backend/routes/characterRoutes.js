import express from 'express';
import {
  createCharacters,
  getCharacters,

} from '../controllers/characterController.js';

const router = express.Router();

router.post('/', createCharacters);
router.get('/', getCharacters);

export default router;