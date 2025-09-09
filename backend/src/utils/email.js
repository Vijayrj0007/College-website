import { Resend } from 'resend';

let resendClient = null;
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

export async function sendEmailOtp({ to, code, purpose }) {
  const client = getResend();
  if (!client) {
    console.log(`[EMAIL OTP - fallback log] to=${to} purpose=${purpose} code=${code}`);
    return;
  }
  const subject = `Your OTP code for ${purpose}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>Verification Code</h2>
      <p>Your OTP for <strong>${purpose}</strong> is:</p>
      <p style="font-size:24px;font-weight:bold;letter-spacing:2px">${code}</p>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  try {
    await client.emails.send({
      from,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Resend send error:', err?.message || err);
    console.log(`[EMAIL OTP - fallback log] to=${to} purpose=${purpose} code=${code}`);
  }
}


