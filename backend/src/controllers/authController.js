import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import { createOtpForEmail, verifyOtp } from '../utils/otp.js';
import { sendEmailOtp } from '../utils/email.js';
import { isEmailAllowed } from '../utils/access.js';
import OtpToken from '../models/OtpToken.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher', 'alumni', 'admin']).default('student')
});

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = registerSchema.parse(req.body);
    if (!isEmailAllowed(email)) {
      res.status(403);
      throw new Error('This email is not allowed for OTP registration');
    }
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error('Email already registered');
    }
    // Create OTP and send
    const { code } = await createOtpForEmail(email, 'register', 300, { name, password, role });
    await sendEmailOtp({ to: email, code, purpose: 'register' });
    res.status(200).json({ message: 'OTP sent to email for registration verification' });
  } catch (err) {
    next(err);
  }
}

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function login(req, res, next) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    if (!isEmailAllowed(email)) {
      res.status(403);
      throw new Error('This email is not allowed for OTP login');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    const ok = await user.comparePassword(password);
    if (!ok) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    const { code } = await createOtpForEmail(email, 'login', 300, {});
    await sendEmailOtp({ to: email, code, purpose: 'login' });
    res.json({ message: 'OTP sent to email for login verification' });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}

// OTP verification endpoints
export async function verifyRegister(req, res, next) {
  try {
    const { email, otp } = z.object({ email: z.string().email(), otp: z.string().length(6) }).parse(req.body);
    const ok = await verifyOtp(email, 'register', otp);
    if (!ok) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }
    // Pull meta to finalize user creation
    // Simpler: require client to resend name/password/role upon verify
    const { name, password, role } = z
      .object({ name: z.string().min(2), password: z.string().min(6), role: z.enum(['student', 'teacher', 'alumni', 'admin']) })
      .parse(req.body);
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error('Email already registered');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}

export async function verifyLogin(req, res, next) {
  try {
    const { email, otp } = z.object({ email: z.string().email(), otp: z.string().length(6) }).parse(req.body);
    const ok = await verifyOtp(email, 'login', otp);
    if (!ok) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

export async function requestPasswordReset(req, res, next) {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      // Don't leak existence
      return res.json({ message: 'If the email exists, OTP has been sent' });
    }
    const { code } = await createOtpForEmail(email, 'reset', 300, {});
    await sendEmailOtp({ to: email, code, purpose: 'reset' });
    res.json({ message: 'OTP sent to email for password reset' });
  } catch (err) {
    next(err);
  }
}

export async function verifyPasswordReset(req, res, next) {
  try {
    const { email, otp, newPassword } = z
      .object({ email: z.string().email(), otp: z.string().length(6), newPassword: z.string().min(6) })
      .parse(req.body);
    const ok = await verifyOtp(email, 'reset', otp);
    if (!ok) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}

// Debug helpers (non-production)
export async function debugStatus(req, res) {
  const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM || null,
    ALLOWED_OTP_EMAILS: process.env.ALLOWED_OTP_EMAILS || null,
    ALLOWED_OTP_DOMAIN: process.env.ALLOWED_OTP_DOMAIN || null,
  };
  res.json({ ok: true, env });
}

export async function resendOtp(req, res, next) {
  try {
    const { email, purpose } = z
      .object({ email: z.string().email(), purpose: z.enum(['register', 'login', 'reset']) })
      .parse(req.body);

    if (!isEmailAllowed(email)) {
      res.status(403);
      throw new Error('This email is not allowed for OTP');
    }

    const existing = await OtpToken.findOne({ email, purpose }).sort({ createdAt: -1 });
    const now = Date.now();
    if (existing) {
      const ageMs = now - existing.createdAt.getTime();
      const minIntervalMs = 60 * 1000; // 1 minute
      if (ageMs < minIntervalMs) {
        const retryAfter = Math.ceil((minIntervalMs - ageMs) / 1000);
        res.status(429);
        throw new Error(`Please wait ${retryAfter}s before requesting a new OTP`);
      }
    }

    const { code } = await createOtpForEmail(email, purpose, 300, {});
    await sendEmailOtp({ to: email, code, purpose });
    res.json({ message: 'OTP resent' });
  } catch (err) {
    next(err);
  }
}

