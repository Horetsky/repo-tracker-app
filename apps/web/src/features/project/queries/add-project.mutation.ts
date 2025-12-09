import { ProjectsEntity } from "@/entities/project";
import { Mutation } from "@/lib/react-query/types";
import { apiClient } from "@/lib/axios/client";

export namespace AddProjectMutation {
    export type TInput = {
        owner: string;
        name: string;
    };
    export type TOutput = ProjectsEntity;
}

export const AddProjectMutation: Mutation<AddProjectMutation.TInput, AddProjectMutation.TOutput> = {
    mutationFn: (variables) => {
        return apiClient.post("/projects", variables);
    },
};