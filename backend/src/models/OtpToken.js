import mongoose from 'mongoose';

const otpTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true },
    purpose: { type: String, enum: ['register', 'login', 'reset'], required: true, index: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    meta: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model('OtpToken', otpTokenSchema);


