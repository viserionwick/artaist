import z from "zod";

const publicEnvSchema = z.object({
    CORS_WHITELIST: z.array(z.string().min(1)).min(1).optional(),
    ARTAIST_API: z.string().min(1).optional(),
    UID: z.string().min(1).optional()
})

export const publicEnv = publicEnvSchema.parse({
    CORS_WHITELIST: process.env.NEXT_PUBLIC_CORS_WHITELIST?.split(","),
    ARTAIST_API: process.env.NEXT_PUBLIC_ARTAIST_API,
    UID: process.env.NEXT_PUBLIC_UID,
});