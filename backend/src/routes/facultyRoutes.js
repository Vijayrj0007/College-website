import { Router } from 'express';
import { list, create, update, remove } from '../controllers/facultyController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', list);
router.post('/', requireAuth, requireRole('admin'), create);
router.put('/:id', requireAuth, requireRole('admin'), update);
router.delete('/:id', requireAuth, requireRole('admin'), remove);

export default router;


