import { z } from "zod";
export const updateBlockingSchema = z.object({
  guardEnabled: z.boolean().optional(),
  activeMode: z.enum(["normal", "deep", "strict"]).optional(),
  blockedCategories: z
    .array(z.enum(["social", "entertainment", "gaming", "shopping", "messaging"])).optional()
});

export const siteSchema=z.object({
      mode: z.enum(["normal", "deep", "strict"]),
      domain:z.string().nonempty(),
})

export const categorySchema=z.object({
    category:z.enum(["social", "entertainment", "gaming", "shopping", "messaging"]),
})

export const addTempSiteSchema=z.object({
      domain:z.string().nonempty(),
      expiresAt:z.string().datetime(),
})
export const removeTempSiteSchema=z.object({
      domain:z.string().nonempty(),
})

