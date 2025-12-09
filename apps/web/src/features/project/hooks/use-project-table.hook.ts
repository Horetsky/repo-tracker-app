import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUserProjectsQuery } from "@/features/project/queries";

export function useProjectTable() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const {
        data,
    } = useQuery({
        ...GetCurrentUserProjectsQuery({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
        }),
        refetchInterval: 3000,
    });

    return {
        projects: data?.data,
        pagination,
        setPagination,
    };
}