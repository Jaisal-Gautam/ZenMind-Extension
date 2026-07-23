import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password cannot exceed 20 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[!@#$%^&*]/, "Must contain a special character");

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1)
});

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(20),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().trim().min(1),
  newPassword: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z
  .string()
  .regex(/^\d{6}$/, "OTP must contain exactly 6 digits"),
  newPassword: passwordSchema,
});

export const verifyResetOtpSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must contain exactly 6 digits"),
});