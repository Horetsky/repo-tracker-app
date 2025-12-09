import { Mutation } from "@/lib/react-query/types";
import { AxiosResponse } from "axios";
import { apiClient } from "@/lib/axios/client";

export namespace LogoutMutation {
    export type TInput = void;
    export type TOutput = AxiosResponse<boolean>;
}

export const LogoutMutation: Mutation<LogoutMutation.TInput, LogoutMutation.TOutput> = {
    mutationFn: () => {
        return apiClient.post("/auth/logout");
    },
};