import { z } from "zod";

export const addProjectFormSchema = z.object({
    path: z.string(),
});

export type AddProjectFormSchemaValues = z.infer<typeof addProjectFormSchema>;