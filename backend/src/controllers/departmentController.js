import { z } from 'zod';
import Department from '../models/Department.js';

const deptSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
});

export async function list(req, res, next) {
  try {
    const items = await Department.find().sort({ name: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = deptSchema.parse(req.body);
    const item = await Department.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const data = deptSchema.partial().parse(req.body);
    const item = await Department.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}


