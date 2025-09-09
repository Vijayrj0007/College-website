import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    studentUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    semester: { type: Number, required: true },
    marks: { type: Number, required: true, min: 0, max: 100 },
    grade: { type: String, enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], required: true },
    examType: { type: String, enum: ['midterm', 'final', 'assignment', 'quiz'], default: 'final' },
    academicYear: { type: String, required: true },
    createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Ensure one result per student per course per semester per exam type
resultSchema.index({ studentUserId: 1, courseId: 1, semester: 1, examType: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('Result', resultSchema);

