import { Resend } from "resend";
import ConfirmationEmail from "@/emails/ConfirmationEmail";
import OwnerNotificationEmail from "@/emails/OwnerNotificationEmail";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY || "";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL ||
  "Villa Monte Calvia <onboarding@resend.dev>";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://montecalvia.com"
).replace(/\/$/, "");

const SUPPORTED_LOCALES = ["en", "it", "pl", "es", "fr", "de"];

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

async function loadTranslations(locale: string) {
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
  const messages = (await import(`../../../../messages/${safeLocale}.json`))
    .default;
  return {
    confirmationEmail: messages.confirmationEmail,
    ownerEmail: messages.ownerEmail,
  };
}

function formatDateForEmail(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
  const message = String(body.message || "").trim();
  const arriveDate = String(body.arriveDate || "").trim();
  const leaveDate = String(body.leaveDate || "").trim();
  const guests = Number(body.guests) || 0;
  const locale = String(body.locale || "en").trim();

  if (website) {
    return Response.json(
      { message: "Spam detected. Please try again later." },
      { status: 400 },
    );
  }

  if (!firstName || !email || !phone || !arriveDate || !leaveDate) {
    return Response.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (guests < 1) {
    return Response.json(
      { message: "Please specify the number of guests." },
      { status: 400 },
    );
  }

  const arrive = new Date(arriveDate);
  const leave = new Date(leaveDate);
  if (isNaN(arrive.getTime()) || isNaN(leave.getTime()) || arrive >= leave) {
    return Response.json(
      { message: "Arrival date must be before departure date." },
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

  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
  const [visitorTranslations, ownerTranslations] = await Promise.all([
    loadTranslations(safeLocale),
    loadTranslations("pl"),
  ]);
  const arriveDateForOwner = formatDateForEmail(arriveDate, "pl");
  const leaveDateForOwner = formatDateForEmail(leaveDate, "pl");

  const resend = new Resend(resendApiKey);

  const [ownerResult, confirmationResult] = await Promise.all([
    resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: ownerTranslations.ownerEmail.subject.replace(
        "{firstName}",
        firstName,
      ),
      react: OwnerNotificationEmail({
        firstName,
        email,
        phone,
        arriveDate: arriveDateForOwner,
        leaveDate: leaveDateForOwner,
        guests,
        message: message || "—",
        translations: ownerTranslations.ownerEmail,
        siteUrl,
      }),
    }),
    resend.emails.send({
      from: contactFromEmail,
      to: email,
      subject: visitorTranslations.confirmationEmail.subject,
      react: ConfirmationEmail({
        firstName,
        translations: visitorTranslations.confirmationEmail,
        siteUrl,
      }),
    }),
  ]);

  if (ownerResult.error || confirmationResult.error) {
    return Response.json(
      { message: "Email delivery failed. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
