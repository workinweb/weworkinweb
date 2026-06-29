import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

interface EmailPayload {
  email: string;
  subject: string;
  message: string;
  name?: string;
  lang?: string;
  company?: string;
}

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;

// Best-effort per-instance rate limiter. Serverless instances are short-lived,
// so this throttles bursts from a single IP without external storage.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (requestLog.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  requestLog.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function resolveAllowedOrigin(requestOrigin: string | null): string | null {
  const configured = import.meta.env.ALLOWED_ORIGIN;
  if (!configured) {
    // No allowlist configured; don't reflect arbitrary origins.
    return null;
  }
  const allowed = configured.split(",").map((o: string) => o.trim());
  if (requestOrigin && allowed.includes(requestOrigin)) {
    return requestOrigin;
  }
  return allowed[0] ?? null;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const requestOrigin = request.headers.get("origin");
  const allowedOrigin = resolveAllowedOrigin(requestOrigin);
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (allowedOrigin) {
    baseHeaders["Access-Control-Allow-Origin"] = allowedOrigin;
  }

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: baseHeaders });

  try {
    const ip = clientAddress ?? request.headers.get("x-forwarded-for") ?? "";
    if (ip && isRateLimited(ip)) {
      return json({ message: "Too many requests. Please try again later." }, 429);
    }

    const payload = (await request.json()) as EmailPayload;
    const { email, subject, message, name, lang, company } = payload;

    // Honeypot: real users never fill this hidden field.
    if (company) {
      return json({ message: "Email sent successfully" }, 200);
    }

    if (!email || !subject || !message) {
      return json({ message: "Missing required fields" }, 400);
    }

    if (!EMAIL_REGEX.test(email)) {
      return json({ message: "Invalid email address" }, 400);
    }

    if (
      email.length > MAX_FIELD_LENGTH ||
      subject.length > MAX_FIELD_LENGTH ||
      message.length > MAX_FIELD_LENGTH ||
      (name?.length ?? 0) > MAX_FIELD_LENGTH
    ) {
      return json({ message: "Field too long" }, 400);
    }

    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: Number(import.meta.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASSWORD,
      },
    });

    const safeMessage = message.replace(/\n/g, "<br>");

    const htmlMessage = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 700px; margin: 0 auto; }
            .container { padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.1); }
            .header { background: #f97316; color: white; padding: 25px; border-radius: 12px 12px 0 0; margin: -30px -30px 30px -30px; }
            .header h2 { font-size: 24px; margin: 0; }
            .content { padding: 0 25px; }
            .field { margin-bottom: 25px; }
            .label { font-weight: bold; color: #f97316; font-size: 16px; display: block; margin-bottom: 8px; }
            .message-box {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-top: 12px;
              font-size: 15px;
              line-height: 1.8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span> ${
                  name ? `${name} (${email})` : email
                }
              </div>
              <div class="field">
                <span class="label">Subject:</span> ${subject}
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">
                  ${safeMessage}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: import.meta.env.EMAIL_RECIPIENT || import.meta.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: message,
      html: htmlMessage,
    });

    if (import.meta.env.SEND_CONFIRMATION === "true") {
      const isEs = lang === "es";
      const confirmation = isEs
        ? {
            subject: "Hemos recibido tu mensaje",
            heading: "¡Gracias por contactarnos!",
            intro:
              "Hemos recibido tu mensaje y te responderemos en un plazo de 24 horas.",
            copy: "Para tu referencia, aquí tienes una copia de tu mensaje:",
            signoff: "Saludos cordiales,",
          }
        : {
            subject: "We've received your message",
            heading: "Thank you for contacting us!",
            intro:
              "We've received your message and will get back to you within 24 hours.",
            copy: "For reference, here's a copy of your message:",
            signoff: "Best regards,",
          };

      await transporter.sendMail({
        from: import.meta.env.EMAIL_USER,
        to: email,
        subject: confirmation.subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 700px; margin: 0 auto; }
                .container { padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.1); }
                .header { background: #2ecc71; color: white; padding: 25px; border-radius: 12px 12px 0 0; margin: -30px -30px 30px -30px; }
                .header h2 { font-size: 24px; margin: 0; }
                .content { padding: 0 25px; }
                p { font-size: 16px; margin: 0 0 20px 0; }
                .message-box {
                  background: #f8f9fa;
                  padding: 20px;
                  border-radius: 8px;
                  margin: 25px 0;
                  font-size: 15px;
                  line-height: 1.8;
                }
                .signature {
                  margin-top: 30px;
                  color: #666;
                  border-top: 1px solid #eee;
                  padding-top: 20px;
                  font-size: 15px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>${confirmation.heading}</h2>
                </div>
                <div class="content">
                  <p>${confirmation.intro}</p>
                  <p>${confirmation.copy}</p>
                  <div class="message-box">
                    ${safeMessage}
                  </div>
                  <div class="signature">
                    ${confirmation.signoff}<br>
                    <strong>WorkInWeb</strong>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    }

    return json({ message: "Email sent successfully" }, 200);
  } catch (error) {
    return json(
      {
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
