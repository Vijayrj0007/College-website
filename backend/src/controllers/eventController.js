import { z } from 'zod';
import Event from '../models/Event.js';

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  location: z.string().optional(),
  bannerUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

export async function list(_req, res, next) {
  try {
    const items = await Event.find().sort({ startAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = eventSchema.parse(req.body);
    const item = await Event.create({ ...data, createdByUserId: req.user?.id });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}


