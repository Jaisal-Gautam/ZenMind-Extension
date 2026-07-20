export const historySchema = z.object({
  range: z.enum(["daily", "weekly"]).default("weekly"),
});