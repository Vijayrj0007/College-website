import { Router } from 'express';
import { chat } from '../controllers/aiController.js';
import rateLimit from 'express-rate-limit';

const router = Router();
const aiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60 });

router.post('/chat', aiLimiter, chat);

export default router;


