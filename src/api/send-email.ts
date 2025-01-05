import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method === "OPTIONS") {
    response.setHeader(
      "Access-Control-Allow-Origin",
      request.headers.origin || "*"
    );
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Max-Age", "86400");
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const allowedOrigin = process.env.ALLOWED_ORIGIN || request.headers.origin;

  try {
    const { email, subject, message, name } = request.body;

    if (!email || !subject || !message) {
      return response.status(400).json({
        message: "Missing required fields",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name ? `${name} (${email})` : email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="margin-top: 20px;">
        <strong>Message:</strong><br>
        ${message.replace(/\n/g, "<br>")}
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: message,
      html: htmlMessage,
    });

    if (process.env.SEND_CONFIRMATION === "true") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "We've received your message",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>For reference, here's a copy of your message:</p>
          <div style="margin: 20px 0; padding: 10px; background: #f5f5f5;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p>Best regards,<br>Your Team Name</p>
        `,
      });
    }

    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    return response.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);

    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    return response.status(500).json({
      message: "Failed to send email",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
