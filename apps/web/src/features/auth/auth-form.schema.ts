import { z } from "zod";

export const authFormSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});
export type AuthFormSchemaValues = z.infer<typeof authFormSchema>;