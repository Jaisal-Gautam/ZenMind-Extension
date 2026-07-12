import { z } from "zod";
export const startFocusSchema = z.object({
    plannedDuration:z.number().min(1).max(1440)
});

export const endFocusSchema = z.object({
    endReason:z.enum(["completed","stopped","crashed"])
});
