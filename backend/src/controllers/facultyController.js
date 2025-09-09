import { z } from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { FacultyProfile } from '../models/Profile.js';

const facultySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  designation: z.string().optional(),
  departmentId: z.string().optional(),
  password: z.string().min(6).optional(),
});

export async function list(_req, res, next) {
  try {
    const profiles = await FacultyProfile.find().populate('userId', 'name email role');
    res.json(profiles);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = facultySchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    let passwordHash = '';
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }
    const user = existing || (await User.create({ name: data.name, email: data.email, passwordHash, role: 'teacher' }));
    const profile = await FacultyProfile.create({ userId: user._id, designation: data.designation, departmentId: data.departmentId });
    res.status(201).json(await profile.populate('userId', 'name email role'));
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const data = facultySchema.partial().parse(req.body);
    // Update FacultyProfile
    const profile = await FacultyProfile.findById(req.params.id);
    if (!profile) {
      res.status(404);
      throw new Error('Faculty not found');
    }
    if (data.designation !== undefined) profile.designation = data.designation;
    if (data.departmentId !== undefined) profile.departmentId = data.departmentId;
    await profile.save();
    // Optionally update linked User
    if (data.name || data.email) {
      const user = await User.findById(profile.userId);
      if (user) {
        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        await user.save();
      }
    }
    const populated = await FacultyProfile.findById(profile._id).populate('userId', 'name email role');
    res.json(populated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const profile = await FacultyProfile.findById(req.params.id);
    if (!profile) {
      res.status(404);
      throw new Error('Faculty not found');
    }
    // Delete profile and linked user account
    const userId = profile.userId;
    await FacultyProfile.findByIdAndDelete(profile._id);
    await User.findByIdAndDelete(userId);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}


