import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    location: { type: String },
    bannerUrl: { type: String },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);


