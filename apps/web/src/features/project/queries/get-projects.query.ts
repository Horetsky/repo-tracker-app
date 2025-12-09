import { RequestWithPagination, ResponseWithPagination } from "@/types/dtos";
import { ProjectsEntity } from "@/entities/project";
import { Query } from "@/lib/react-query/types";
import { QueryKey } from "@/lib/react-query/query-key";
import { apiClient } from "@/lib/axios/client";
import { AxiosResponse } from "axios";

export namespace GetCurrentUserProjectsQuery {
    export type TInput = Partial<RequestWithPagination>;
    export type TOutput = AxiosResponse<ResponseWithPagination<ProjectsEntity[]>>;
}

export const GetCurrentUserProjectsQuery = (input: GetCurrentUserProjectsQuery.TInput = {}): Query<GetCurrentUserProjectsQuery.TInput, GetCurrentUserProjectsQuery.TOutput> => {
    return {
        queryKey: ["projects/me", ...QueryKey.fromObject(input)],
        queryFn: () => {
            return apiClient.get("/projects/me", {
                params: input,
            });
        },
    };
};