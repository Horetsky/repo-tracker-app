import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProjectMutation, GetCurrentUserProjectsQuery, RefreshProjectMutation } from "@/features/project/queries";
import { useRef } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";
import { PaginationState } from "@tanstack/react-table";
import { QueryKey } from "@/lib/react-query/query-key";

export function useProjectActions(pagination?: PaginationState) {
    const queryClient = useQueryClient();

    const refetchData = () => {
        let queryKey = GetCurrentUserProjectsQuery().queryKey;

        if(pagination) {
            queryKey = queryKey.concat(
                QueryKey.fromObject({
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                }),
            );
        }

        queryClient.refetchQueries({ queryKey });
    };

    const projectIdToRefresh = useRef<string | null>(null);
    const refreshProjectMutation = useMutation({
        ...RefreshProjectMutation,
        onSettled: () => {
            projectIdToRefresh.current = null;
        },
        onSuccess: () => {
            toast.success("Project refreshed successfully");
            refetchData();
        },
        onError: (error ) => {
            toast.error("Failed to refresh project", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleRefreshProject = (projectId: string) => {
        projectIdToRefresh.current = projectId;
        refreshProjectMutation.mutate(projectId);
    };
    const isRefreshing = (projectId: string) => {
        return (projectIdToRefresh.current === projectId) && refreshProjectMutation.isPending;
    };

    const projectIdToDelete = useRef<string | null>(null);
    const deleteProjectMutation = useMutation({
        ...DeleteProjectMutation,
        onSettled: () => {
            projectIdToDelete.current = null;
        },
        onSuccess: () => {
            toast.success("Project deleted successfully");
            refetchData();
        },
        onError: (error) => {
            toast.error("Failed to delete project", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleDeleteProject = (projectId: string) => {
        projectIdToDelete.current = projectId;
        deleteProjectMutation.mutate(projectId);
    };
    const isDeleting = (projectId: string) => {
        return (projectIdToDelete.current === projectId) && deleteProjectMutation.isPending;
    };

    return {
        isRefreshing,
        handleRefreshProject,

        isDeleting,
        handleDeleteProject,
    };
}