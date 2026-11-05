import nodemailer from "nodemailer";
import { SITE } from "@/data/site";

interface MailInput {
  to: string;
  subject: string;
  text: string;
}

// Public base URL used in email links
export function siteUrl(): string {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

// Sends an email through SMTP. When SMTP is not configured the message is printed
// to the server terminal so the flow can still be tested locally.
// Returns true when a real email was sent.
export async function sendMail({ to, subject, text }: MailInput): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log(`\n[mail:dev] To: ${to}\nSubject: ${subject}\n${text}\n`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? `${SITE.name} <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
    return true;
  } catch (error) {
    // A failed email must never break signup or enrollment
    console.error("[mail] failed to send:", error);
    return false;
  }
}
