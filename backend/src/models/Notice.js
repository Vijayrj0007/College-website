import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'general' },
    attachments: [{ type: String }],
    isPinned: { type: Boolean, default: false },
    audienceRoles: [{ type: String, enum: ['student', 'teacher', 'alumni', 'admin'] }],
    publishedAt: { type: Date, default: Date.now },
    createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);


