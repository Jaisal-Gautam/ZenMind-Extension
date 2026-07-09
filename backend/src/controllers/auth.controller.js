import { createUser, loginUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await createUser({ username, email, password });
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await loginUser({ username, password });
  res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
