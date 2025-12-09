import { AxiosResponse } from "axios";
import { Mutation } from "@/lib/react-query/types";
import { apiClient } from "@/lib/axios/client";

export namespace RefreshProjectMutation {
    export type TInput = string; // projectId

    export type TOutput = AxiosResponse<boolean>;
}

export const RefreshProjectMutation: Mutation<RefreshProjectMutation.TInput, RefreshProjectMutation.TOutput> = {
    mutationFn: (id) => {
        return apiClient.post(`/projects/${id}/refresh`);
    },
};