export function getAllowedEmails() {
  const raw = process.env.ALLOWED_OTP_EMAILS || '';
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function getAllowedDomain() {
  const d = (process.env.ALLOWED_OTP_DOMAIN || '').trim().toLowerCase();
  return d || null;
}

export function isEmailAllowed(email) {
  const e = (email || '').trim().toLowerCase();
  const allowlist = getAllowedEmails();
  if (allowlist.length && allowlist.includes(e)) return true;
  const domain = getAllowedDomain();
  if (domain && e.endsWith('@' + domain)) return true;
  // If neither env is set, allow all by default
  if (!allowlist.length && !domain) return true;
  return false;
}


