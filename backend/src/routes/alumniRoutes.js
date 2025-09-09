import { Router } from 'express';
import { list, detail, create, update, remove, search, getStats } from '../controllers/alumniController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', list);
router.get('/search', search);
router.get('/stats', getStats);
router.get('/:id', detail);

// Protected routes
router.post('/', requireAuth, requireRole('alumni'), create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;

