import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

interface EmailPayload {
  email: string;
  subject: string;
  message: string;
  name?: string;
}
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const allowedOrigin =
    import.meta.env.ALLOWED_ORIGIN || request.headers.get("origin");

  try {
    const payload = (await request.json()) as EmailPayload;
    const { email, subject, message, name } = payload;

    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: Number(import.meta.env.EMAIL_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASSWORD,
      },
    });

    // Format the email content
    const htmlMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name ? `${name} (${email})` : email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="margin-top: 20px;">
        <strong>Message:</strong><br>
        ${message.replace(/\n/g, "<br>")}
      </div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: import.meta.env.EMAIL_RECIPIENT || import.meta.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: message,
      html: htmlMessage,
    });

    // Send confirmation email to user
    if (import.meta.env.SEND_CONFIRMATION === "true") {
      await transporter.sendMail({
        from: import.meta.env.EMAIL_USER,
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

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      }
    );
  }
};
