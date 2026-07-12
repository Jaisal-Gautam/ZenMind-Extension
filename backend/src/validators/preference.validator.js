import { z } from "zod";

export const preferenceSchema = z.object({
  defaultFocusDuration: z.number().min(1).max(1440).optional(),
  dailyFocusGoal: z.number().min(1).max(1440).optional(),
  defaultMusic: z.string().optional(),
  defaultMusicVolume: z.number().min(0).max(100).optional(),
  musicLoop: z.boolean().optional(),
  customPresets: z.array(customPresetSchema).optional(),
});

const customPresetSchema = z.object({
  id: z.string().nonempty(),
  duration: z.number().min(1).max(1440),
});
