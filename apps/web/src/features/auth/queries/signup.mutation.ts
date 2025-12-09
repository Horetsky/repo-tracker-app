import { Mutation } from "@/lib/react-query/types";
import { apiClient } from "@/lib/axios/client";
import { AxiosResponse } from "axios";
import { SessionEntity } from "@/entities/session";

export namespace SignUpMutation {
    export type TInput = {
        email: string;
        password: string;
    };
    export type TOutput = AxiosResponse<{
        accessToken: string;
        payload: SessionEntity
    }>;
}

export const SignUpMutation: Mutation<SignUpMutation.TInput, SignUpMutation.TOutput> = {
    mutationFn: ({ email, password }) => {
        return apiClient.post("/auth/register", { email, password });
    },
};