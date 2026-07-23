import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email, otp) => {
  const response = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "ZenMind Password Reset Code",
    html: `
      <h2>Password Reset Request</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });



  if (response.error) {
    throw new Error(response.error.message);
  }
};