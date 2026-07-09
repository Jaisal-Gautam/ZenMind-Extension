import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

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
  return user;
};

export const loginUser = async ({ username, password }) => {
  let user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, "Invalid username or password.");
  }
  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) {
    throw new ApiError(401, "Invalid username or password.");
  }
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false });
  return { user, accessToken, refreshToken };
};
