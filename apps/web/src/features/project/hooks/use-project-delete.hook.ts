import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProjectMutation, GetCurrentUserProjectsQuery } from "@/features/project/queries";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";

export function useProjectDelete() {
    const queryClient = useQueryClient();

    const projectIdToDelete = useRef<string | null>(null);
    const deleteProjectMutation = useMutation({
        ...DeleteProjectMutation,
        onSettled: () => {
            projectIdToDelete.current = null;
        },
        onSuccess: () => {
            toast.success("Project deleted successfully");
            queryClient.invalidateQueries({
                queryKey: GetCurrentUserProjectsQuery().queryKey,
            });
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
        isDeleting,
        handleDeleteProject,
    };
}