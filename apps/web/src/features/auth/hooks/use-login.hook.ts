import { useMutation } from "@tanstack/react-query";
import { LoginMutation } from "@/features/auth/queries";
import { AuthFormSchemaValues } from "@/features/auth/auth-form.schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";
import { useSessionStore } from "@/features/session/session.store";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();
    const sessionStore = useSessionStore();

    const loginMutation = useMutation({
        ...LoginMutation,
        onSuccess: ({ data }) => {
            sessionStore.setSession({
                sub: data.payload.sub,
                email: data.payload.email,
            });
            router.replace("/");
        },
        onError: (error) => {
            toast.error("Login Failed", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleLogin = (values: AuthFormSchemaValues) => {
        loginMutation.mutate(values);
    };

    return {
        isLoading: loginMutation.isPending,
        handleLogin,
    };
}