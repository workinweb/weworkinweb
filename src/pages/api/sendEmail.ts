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

    // Format the email content with improved styling
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 700px; margin: 0 auto; }
            .container { padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.1); }
            .header { background: #4a90e2; color: white; padding: 25px; border-radius: 12px 12px 0 0; margin: -30px -30px 30px -30px; }
            .header h2 { font-size: 24px; margin: 0; }
            .content { padding: 0 25px; }
            .field { margin-bottom: 25px; }
            .label { font-weight: bold; color: #4a90e2; font-size: 16px; display: block; margin-bottom: 8px; }
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
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
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

    // Send confirmation email to user with improved styling
    if (import.meta.env.SEND_CONFIRMATION === "true") {
      await transporter.sendMail({
        from: import.meta.env.EMAIL_USER,
        to: email,
        subject: "We've received your message",
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
                  <h2>Thank you for contacting us!</h2>
                </div>
                <div class="content">
                  <p>We've received your message and will get back to you within 24 hours.</p>
                  <p>For reference, here's a copy of your message:</p>
                  <div class="message-box">
                    ${message.replace(/\n/g, "<br>")}
                  </div>
                  <div class="signature">
                    Best regards,<br>
                    <strong>Your Team Name</strong>
                  </div>
                </div>
              </div>
            </body>
          </html>
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
