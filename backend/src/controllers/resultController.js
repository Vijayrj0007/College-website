import { z } from 'zod';
import Result from '../models/Result.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

const resultSchema = z.object({
  studentUserId: z.string().min(1),
  courseId: z.string().min(1),
  semester: z.number().int().positive(),
  marks: z.number().min(0).max(100),
  grade: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']),
  examType: z.enum(['midterm', 'final', 'assignment', 'quiz']).optional(),
  academicYear: z.string().min(1),
});

export async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '', studentId = '', courseId = '', semester = '' } = req.query;
    const filter = {};
    
    if (search) {
      filter.$or = [
        { academicYear: { $regex: search, $options: 'i' } },
        { examType: { $regex: search, $options: 'i' } }
      ];
    }
    if (studentId) filter.studentUserId = studentId;
    if (courseId) filter.courseId = courseId;
    if (semester) filter.semester = Number(semester);

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Result.find(filter)
        .populate('studentUserId', 'name email')
        .populate('courseId', 'code title')
        .populate('createdByUserId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Result.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = resultSchema.parse(req.body);
    const result = await Result.create({ ...data, createdByUserId: req.user?.id });
    const populated = await Result.findById(result._id)
      .populate('studentUserId', 'name email')
      .populate('courseId', 'code title');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const data = resultSchema.partial().parse(req.body);
    const result = await Result.findByIdAndUpdate(req.params.id, data, { new: true })
      .populate('studentUserId', 'name email')
      .populate('courseId', 'code title');
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function getStudentResults(req, res, next) {
  try {
    const { studentId } = req.params;
    const { semester = '', academicYear = '' } = req.query;
    const filter = { studentUserId: studentId };
    if (semester) filter.semester = Number(semester);
    if (academicYear) filter.academicYear = academicYear;

    const results = await Result.find(filter)
      .populate('courseId', 'code title credits')
      .sort({ semester: -1, createdAt: -1 });
    res.json(results);
  } catch (err) {
    next(err);
  }
}

