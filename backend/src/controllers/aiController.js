import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1),
});

export async function chat(req, res, next) {
  try {
    const { message } = chatSchema.parse(req.body);
    // Placeholder: echo with a simple rule-based response
    const lower = message.toLowerCase();
    let reply = "I'm here to help with admissions, notices, and events.";
    if (lower.includes('admission')) reply = 'Admissions open dates will be posted under Notices.';
    if (lower.includes('notice')) reply = 'You can find latest notices on the Notices page.';
    if (lower.includes('event')) reply = 'Upcoming events are listed on the Events section.';
    res.json({ reply });
  } catch (err) {
    next(err);
  }
}


