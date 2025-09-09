import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import OtpToken from '../models/OtpToken.js';

export function generateOtp() {
  const code = ('' + Math.floor(100000 + Math.random() * 900000));
  return code;
}

export async function createOtpForEmail(email, purpose, ttlSeconds = 300, meta = {}) {
  const code = generateOtp();
  const otpHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  await OtpToken.deleteMany({ email, purpose });
  await OtpToken.create({ email, purpose, otpHash, expiresAt, meta });
  return { code, expiresAt };
}

export async function verifyOtp(email, purpose, code) {
  const record = await OtpToken.findOne({ email, purpose });
  if (!record) return false;
  const ok = await bcrypt.compare(code, record.otpHash);
  if (!ok) return false;
  if (record.expiresAt.getTime() < Date.now()) return false;
  await OtpToken.deleteOne({ _id: record._id });
  return true;
}


