import { z } from "zod";

export const createWebSessionSchema = z.object({
  domain: z.string().nonempty(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  duration: z.number().min(1),
});
