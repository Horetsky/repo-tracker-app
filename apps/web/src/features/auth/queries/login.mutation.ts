import { Mutation } from "@/lib/react-query/types";
import { apiClient } from "@/lib/axios/client";
import { AxiosResponse } from "axios";
import { SessionEntity } from "@/entities/session";

export namespace LoginMutation {
    export type TInput = {
        email: string;
        password: string;
    };
    export type TOutput = AxiosResponse<{
        accessToken: string;
        payload: SessionEntity
    }>;
}

export const LoginMutation: Mutation<LoginMutation.TInput, LoginMutation.TOutput> = {
    mutationFn: ({ email, password }) => {
        return apiClient.post("/auth/login", {email, password});
    },
};