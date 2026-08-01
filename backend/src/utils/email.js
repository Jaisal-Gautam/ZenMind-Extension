import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email, otp) => {
  const response = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "ZenMind - Password Reset Verification Code",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 40px 10px;">
            <tr>
              <td align="center">
                <!-- Main Email Card -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                  
                  <!-- Logo Header -->
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #2d4b41; letter-spacing: -0.5px;">
                        ZenMind
                      </h1>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 600; color: #111827;">
                        Reset your password
                      </h2>
                      <p style="margin: 0; font-size: 14px; line-height: 22px; color: #6b7280; text-align: center;">
                        We received a request to reset your ZenMind account password. Use the verification code below to complete the process.
                      </p>
                    </td>
                  </tr>

                  <!-- OTP Display Box -->
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <div style="background-color: #f8faf9; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 32px; display: inline-block;">
                        <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2d4b41;">
                          ${otp}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <!-- Timer & Disclaimer -->
                  <tr>
                    <td align="center" style="padding-bottom: 32px;">
                      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 500; color: #059669;">
                        ⏳ This code expires in 10 minutes.
                      </p>
                      <p style="margin: 0; font-size: 12px; line-height: 18px; color: #9ca3af; text-align: center;">
                        If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer Divider -->
                  <tr>
                    <td style="border-top: 1px solid #f3f4f6; padding-top: 24px;" align="center">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        &copy; 2026 ZenMind. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }
};