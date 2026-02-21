import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY || "";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL ||
  "Villa Monte Calvia <onboarding@resend.dev>";

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  if (entry.count >= rateLimitMax) {
    return true;
  }
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const firstName = String(body.firstName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const website = String(body.website || "").trim();

  if (website) {
    return Response.json(
      { message: "Spam detected. Please try again later." },
      { status: 400 },
    );
  }

  if (!firstName || !email || !phone) {
    return Response.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!resendApiKey || !contactToEmail) {
    return Response.json(
      {
        message:
          "Email configuration missing. Please contact the administrator.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  const result = await resend.emails.send({
    from: contactFromEmail,
    to: contactToEmail,
    replyTo: email,
    subject: `New enquiry — ${firstName}`,
    text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}`,
  });

  if (result.error) {
    return Response.json(
      { message: "Email delivery failed. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
