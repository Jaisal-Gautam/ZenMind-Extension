import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535),

  MONGO_URI: z.string().min(1),

  CLIENT_URL: z.string().url(),

  ACCESS_TOKEN_SECRET: z.string().min(32),

  REFRESH_TOKEN_SECRET: z.string().min(32),

  ACCESS_TOKEN_EXPIRY: z.string(),

  REFRESH_TOKEN_EXPIRY: z.string(),
});

export const env = envSchema.parse(process.env);