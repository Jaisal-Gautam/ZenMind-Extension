import {
  createUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  requestPasswordReset,
  resetPassword,
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
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser({
    email,
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

export const changePasswordController=asyncHandler(async (req,res)=>{
  const {currentPassword, newPassword}=req.body;
  const userId = req.user._id;
  await changePassword({id:userId,currentPassword, newPassword})
  res.status(200).json({
    success:true,
    message: "Password changed successfully. Please LogIn again!"
  })
})

export const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await requestPasswordReset({ email });
  res.status(200).json({
    success: true,
    message: "If an account with that email exists, we've sent a verification code.",
  });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await resetPassword({ email, otp, newPassword });
  res.status(200).json({
    success: true,
    message: "Password reset successfully. Please log in again.",
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
