import { Router } from 'express';
import { login, register, me, verifyRegister, verifyLogin, requestPasswordReset, verifyPasswordReset, debugStatus, resendOtp } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', requireAuth, me);
router.post('/verify-register', verifyRegister);
router.post('/verify-login', verifyLogin);
router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-password-reset', verifyPasswordReset);
router.post('/resend-otp', resendOtp);
// debug (non-production)
router.get('/debug/status', debugStatus);


export default router;


