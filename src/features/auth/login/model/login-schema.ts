import {z} from "zod";

export const loginSchema = z.object({
    email: z
        .email()
        .trim(),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters.")
        .max(64, "Password must be at most 64 characters."),
})