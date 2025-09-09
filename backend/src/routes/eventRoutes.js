import { Router } from 'express';
import { list, create } from '../controllers/eventController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', list);
router.post('/', requireAuth, requireRole('teacher', 'admin'), create);

export default router;


