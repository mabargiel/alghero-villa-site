/**
 * Email format check that requires a dotted domain (e.g. rejects
 * "asdasd@dsaasd"), which the browser's built-in `type="email"` validation
 * accepts. Shared by the contact form, the pricing-modal inquiry step, and the
 * server-side API route so all three agree on what a valid address looks like.
 */
export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,255}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}
