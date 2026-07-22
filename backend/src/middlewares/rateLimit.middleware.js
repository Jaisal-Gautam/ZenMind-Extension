import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  statusCode: 429,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export const writeLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  statusCode: 429,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export const readLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  statusCode: 429,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
