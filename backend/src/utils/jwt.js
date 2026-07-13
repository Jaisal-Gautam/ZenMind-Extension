import jwt from "jsonwebtoken";
import { ApiError } from "./apiError.js";
import { env } from "../config/env.js";
import { env } from "../config/env.js";
export const generateAccessToken = (userId) => {
  const token = jwt.sign({ id: userId }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });
  return token;
};

export const generateRefreshToken = (userId) => {
  const token = jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
  return token;
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized Access");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized Access");
  }
};
