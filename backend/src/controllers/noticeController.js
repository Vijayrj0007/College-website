import { z } from 'zod';
import Notice from '../models/Notice.js';

const noticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
  audienceRoles: z.array(z.enum(['student', 'teacher', 'alumni', 'admin'])).optional(),
  publishedAt: z.string().datetime().optional(),
});

export async function list(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const filter = search
      ? { $or: [ { title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } } ] }
      : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Notice.find(filter).sort({ isPinned: -1, publishedAt: -1 }).skip(skip).limit(Number(limit)),
      Notice.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = noticeSchema.parse(req.body);
    const notice = await Notice.create({ ...data, createdByUserId: req.user?.id });
    res.status(201).json(notice);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const data = noticeSchema.partial().parse(req.body);
    const updated = await Notice.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}


