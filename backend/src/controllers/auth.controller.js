import {
  createUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await createUser({ username, email, password });
  const userRes = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user:userRes,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser({
    username,
    password,
  });
  const userRes = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    user: userRes,
    accessToken,
    refreshToken,
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const refreshTokenController = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const { accessToken } = await refreshAccessToken({ refreshToken });
  res.status(200).json({
    success: true,
    accessToken,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const id = req.user._id;
  await logoutUser({ id });
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});
