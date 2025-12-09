import { useMutation } from "@tanstack/react-query";
import { LogoutMutation } from "@/features/auth/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";

export function useLogout() {
    const router = useRouter();

    const logoutMutation = useMutation({
        ...LogoutMutation,
        onSuccess: () => {
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