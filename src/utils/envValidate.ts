import z from "zod";

const publicEnvSchema = z.object({
    API_HOST: z.string().min(1),
    API_VERSION: z.string().min(1),
    CORS_WHITELIST: z.array(z.string().min(1)).min(1),
    ARTAIST_API: z.string().min(1)
})

export const publicEnv = publicEnvSchema.parse({
    API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    API_VERSION: process.env.NEXT_PUBLIC_API_VERSION,
    CORS_WHITELIST: process.env.NEXT_PUBLIC_CORS_WHITELIST?.split(","),
    ARTAIST_API: process.env.NEXT_PUBLIC_ARTAIST_API,
});