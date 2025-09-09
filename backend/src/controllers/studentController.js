import { z } from 'zod';
import User from '../models/User.js';
import { StudentProfile } from '../models/Profile.js';

const studentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  rollNo: z.string().min(1),
  departmentId: z.string().optional(),
  semester: z.number().int().optional(),
});

export async function list(_req, res, next) {
  try {
    const { page = 1, limit = 10, search = '' } = _req.query;
    const filter = search
      ? { $or: [ { rollNo: { $regex: search, $options: 'i' } } ] }
      : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [profiles, total] = await Promise.all([
      StudentProfile.find(filter).populate('userId', 'name email role').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      StudentProfile.countDocuments(filter)
    ]);
    res.json({ items: profiles, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const profile = await StudentProfile.findById(req.params.id).populate('userId', 'name email role');
    if (!profile) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = studentSchema.parse(req.body);
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.status(400);
      throw new Error('User with this email already exists');
    }
    // Create user first
    const user = await User.create({ name: data.name, email: data.email, passwordHash: 'temp', role: 'student' });
    // Create student profile
    const profile = await StudentProfile.create({ userId: user._id, rollNo: data.rollNo, departmentId: data.departmentId, semester: data.semester });
    res.status(201).json(await profile.populate('userId', 'name email role'));
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const data = studentSchema.partial().parse(req.body);
    const profile = await StudentProfile.findByIdAndUpdate(req.params.id, data, { new: true }).populate('userId', 'name email role');
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await StudentProfile.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}


