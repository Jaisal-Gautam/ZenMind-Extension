import {z} from "zod";

export const createBlockedAttemptSchema = z.object({
    domain:z.string().nonempty(),
    mode:z.enum(["normal","focus","strict"]),
    blockedAt:z.string().datetime(),
    
})
