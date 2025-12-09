import { useProjectActionsStore } from "@/features/project/project-actions.store";
import { useMutation } from "@tanstack/react-query";
import { RefreshProjectMutation } from "@/features/project/queries";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";

export function useProjectRefresh() {
    const projectActionStore = useProjectActionsStore();

    const refreshProjectMutation = useMutation({
        ...RefreshProjectMutation,
        onError: (error, projectId) => {
            projectActionStore.actions.unmarkRefreshing(projectId);
            toast.error("Failed to refresh project", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleRefreshProject = (projectId: string) => {
        projectActionStore.actions.markRefreshing(projectId);
        refreshProjectMutation.mutate(projectId);
    };
    const isRefreshing = (projectId: string) => {
        return projectActionStore.refreshingIds.includes(projectId);
    };

    return {
        isRefreshing,
        handleRefreshProject,
    };
}