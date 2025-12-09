import { z } from "zod";

const REPO_REGEX = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+$/;

export const addProjectFormSchema = z.object({
    path: z
        .string()
        .trim()
        .min(1, "Repository path is required")
        .regex(REPO_REGEX, {
            message: "Invalid format. Use 'owner/repo' (e.g. facebook/react)",
        })
        .refine((val) => !val.includes("github.com"), {
            message: "Please enter only 'owner/repo', not the full URL",
        }),
});

export type AddProjectFormSchemaValues = z.infer<typeof addProjectFormSchema>;