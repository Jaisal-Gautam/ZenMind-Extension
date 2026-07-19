import {z} from "zod";

export const createBlockedAttemptSchema = z.object({
    domain:z.string().nonempty(),
    mode:z.enum(["normal","deep","strict"]),
    blockedAt:z.string().datetime(),
    
})
