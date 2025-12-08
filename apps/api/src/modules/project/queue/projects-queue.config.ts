import { IQueueConfig } from "@/lib/bullmq/types";

export const ProjectQueues = ["githubSync"] as const;
export type ProjectQueues = typeof ProjectQueues[number];

export const projectsQueueConfig: Record<ProjectQueues, IQueueConfig> = {
    githubSync: {
        name: "github-sync",
    },
};