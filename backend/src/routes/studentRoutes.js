import { Router } from 'express';
import { list, detail, create, update, remove } from '../controllers/studentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', list);
router.get('/:id', detail);
router.post('/', requireAuth, requireRole('admin'), create);
router.put('/:id', requireAuth, requireRole('admin'), update);
router.delete('/:id', requireAuth, requireRole('admin'), remove);

export default router;


