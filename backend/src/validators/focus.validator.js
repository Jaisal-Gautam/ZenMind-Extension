import { z } from "zod";

export const startFocusSchema = z.object({
  plannedDuration: z.number().min(1).max(1440),
});

export const endFocusSchema = z.object({
  status: z.enum(["completed", "cancelled", "expired"]),
});

export const pauseResumeSchema = z.object({});