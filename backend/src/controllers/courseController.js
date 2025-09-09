import { z } from 'zod';
import Course from '../models/Course.js';

const courseSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  credits: z.number().int().positive().optional(),
  departmentId: z.string().optional(),
  description: z.string().optional(),
});

export async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const filter = search ? { $or: [ { title: { $regex: search, $options: 'i' } }, { code: { $regex: search, $options: 'i' } } ] } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Course.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Course.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) { next(err); }
}

export async function create(req, res, next) {
  try { const data = courseSchema.parse(req.body); const item = await Course.create(data); res.status(201).json(item); }
  catch (err) { next(err); }
}

export async function update(req, res, next) {
  try { const data = courseSchema.partial().parse(req.body); const item = await Course.findByIdAndUpdate(req.params.id, data, { new: true }); res.json(item); }
  catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try { await Course.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (err) { next(err); }
}


