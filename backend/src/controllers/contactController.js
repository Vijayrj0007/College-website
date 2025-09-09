import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function submit(req, res, next) {
  try {
    const data = contactSchema.parse(req.body);
    // For MVP, just respond OK. Later: store in DB or send email.
    res.status(201).json({ ok: true, received: data });
  } catch (err) {
    next(err);
  }
}


