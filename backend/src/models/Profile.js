import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    rollNo: { type: String, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    semester: { type: Number },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const facultyProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    designation: { type: String },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    bio: { type: String },
    expertise: [{ type: String }],
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
export const FacultyProfile = mongoose.model('FacultyProfile', facultyProfileSchema);


