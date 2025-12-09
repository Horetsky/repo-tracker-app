import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCurrentUserProjectsQuery } from "@/features/project/queries";
import { ProjectSyncStatus } from "@/entities/project";
import { useProjectActionsStore } from "@/features/project/project-actions.store";
import { toast } from "sonner";

export function useProjectTable() {
    const queryClient = useQueryClient();
    const projectActionStore = useProjectActionsStore(state => state.actions);

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
    });


    useEffect(() => {
        const eventSource = new EventSource(process.env.NEXT_PUBLIC_API_URL + "/projects/sync", {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);

            const status = message.status as ProjectSyncStatus;

            projectActionStore.unmarkRefreshing(message.projectId);

            queryClient.invalidateQueries({
                queryKey: GetCurrentUserProjectsQuery().queryKey,
            });


            switch(status) {
                case ProjectSyncStatus.SYNCED:
                    toast.success("Project data updated form GitHub");
                    break;
                case ProjectSyncStatus.ERROR:
                    toast.error("Failed to sync project data from GitHub");
                    break;
            }
        };

        return () => eventSource.close();
    }, []);

    return {
        projects: data?.data,
        pagination,
        setPagination,
    };
}