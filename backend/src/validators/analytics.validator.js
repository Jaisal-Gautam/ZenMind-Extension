import z from "zod";

export const historySchema = z.object({
  range: z.enum(["daily", "weekly"]).default("weekly"),
});