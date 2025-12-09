import { AxiosResponse } from "axios";
import { Mutation } from "@/lib/react-query/types";
import { apiClient } from "@/lib/axios/client";

export namespace DeleteProjectMutation {
    export type TInput = string; // projectId

    export type TOutput = AxiosResponse<boolean>;
}

export const DeleteProjectMutation: Mutation<DeleteProjectMutation.TInput, DeleteProjectMutation.TOutput> = {
    mutationFn: (id) => {
        return apiClient.delete(`/projects/${id}`);
    },
};