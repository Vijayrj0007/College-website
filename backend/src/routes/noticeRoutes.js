import { Router } from 'express';
import { list, create, update, remove } from '../controllers/noticeController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', list);
router.post('/', requireAuth, requireRole('teacher', 'admin'), create);
router.put('/:id', requireAuth, requireRole('teacher', 'admin'), update);
router.delete('/:id', requireAuth, requireRole('teacher', 'admin'), remove);

export default router;


