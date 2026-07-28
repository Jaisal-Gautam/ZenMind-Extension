import crypto from "crypto";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError.js";
import { createDefaultPreferences } from "./preference.service.js";
import { createDefaultBlocking } from "./blocking.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { sendPasswordResetEmail } from "../utils/email.js";

export const createUser = async ({
  username,
  email,
  password,
  timezone,
}) => {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsername = username.trim().toLowerCase();

  const userExist = await User.findOne({
    $or: [{ normalizedUsername }, { email: normalizedEmail }],
  });

  if (userExist) {
    if (userExist.email === normalizedEmail) {
      throw new ApiError(409, "Email already exists.");
    }

    throw new ApiError(409, "Username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email: normalizedEmail,
    password: hashedPassword,
    timezone: timezone || "UTC",
  });

  await createDefaultPreferences(user._id);
  await createDefaultBlocking(user._id);

  return user;
};
export const loginUser = async ({
  email,
  password,
  timezone,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Update timezone if it changed
  if (timezone && user.timezone !== timezone) {
    user.timezone = timezone;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};
export const refreshAccessToken = async ({ refreshToken }) => {
  const { id } = verifyRefreshToken(refreshToken);

  const user = await User.findById(id).select("+refreshToken");
  if (!user) throw new ApiError(401, "Unauthorized Access");

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Unauthorized Access");
  }
  const accessToken = generateAccessToken(user._id);
  return { accessToken };
};

export const changePassword = async ({ id, currentPassword, newPassword }) => {
  const user = await User.findById(id).select("+password +refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }
  const correctPass = await bcrypt.compare(currentPassword, user.password);

  if (!correctPass) {
    throw new ApiError(401, "Current password is incorrect.");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  return;
};

export const requestPasswordReset = async ({ email }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) return;

  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

  const hashedOtp = await bcrypt.hash(otp, 10);

  user.resetPasswordOTP = hashedOtp;
  user.resetPasswordOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(user.email, otp);
  } catch (error) {
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  console.error(error); // optional for server logs

  throw new ApiError(500, "Failed to send verification email.");
}
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+resetPasswordOTP +resetPasswordOTPExpiry +refreshToken",
  );

  if (!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  if (new Date(user.resetPasswordOTPExpiry) < new Date()) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  const isOtpValid = await bcrypt.compare(otp, user.resetPasswordOTP);
  if (!isOtpValid) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  return;
};
export const verifyResetOtp = async ({ email, otp }) => {
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select("+resetPasswordOTP +resetPasswordOTPExpiry");

  if (!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  if (new Date(user.resetPasswordOTPExpiry) < new Date()) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ApiError(400, "Invalid or expired verification code.");
  }

  const isOtpValid = await bcrypt.compare(
    otp,
    user.resetPasswordOTP,
  );

  if (!isOtpValid) {
    throw new ApiError(400, "Invalid or expired verification code.");
  }

  return;
};

export const logoutUser = async ({ id }) => {
  const user = await User.findById(id).select("+refreshToken");
  if (!user) {
    throw new ApiError(404, "Invalid user.");
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  return;
};
