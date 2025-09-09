import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    credits: { type: Number, default: 3 },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);


