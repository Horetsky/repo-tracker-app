import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutMutation } from "@/features/auth/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        ...LogoutMutation,
        onSuccess: () => {
            queryClient.clear();
            router.refresh();
        },
        onError: (error) => {
            toast.error("Logout Failed", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return {
        isLoading: logoutMutation.isPending,
        handleLogout,
    };
}