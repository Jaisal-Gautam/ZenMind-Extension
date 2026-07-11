import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError.js";
import { createDefaultPreferences } from "./preference.service.js";
import {createDefaultBlocking} from "./blocking.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const createUser = async ({ username, email, password }) => {
  const userExist = await User.findOne({ $or: [{ username }, { email }] });
  if (userExist) {
    throw new ApiError(409, "Username or email already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  await createDefaultPreferences(user._id);
  await createDefaultBlocking(user._id);
  return user;
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username }).select(
    "+password  +refreshToken",
  );
  if (!user) {
    throw new ApiError(401, "Invalid username or password.");
  }
  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) {
    throw new ApiError(401, "Invalid username or password.");
  }
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async ({ refreshToken }) => {
  const { id } = verifyRefreshToken(refreshToken);

  const user = await User.findById(id).select(
    "+refreshToken");
  if (!user) throw new ApiError(401, "Unauthorized Access");

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Unauthorized Access");
  }
  const accessToken = generateAccessToken(user._id);
  return { accessToken };
};

export const logoutUser = async ({ id }) => {
  const user = await User.findById(id).select(
    "+refreshToken");
  if (!user) {
    throw new ApiError(404, "Invalid user.");
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  return;
};
