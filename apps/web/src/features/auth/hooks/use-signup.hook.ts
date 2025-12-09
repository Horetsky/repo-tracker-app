import { useMutation } from "@tanstack/react-query";
import { SignUpMutation } from "@/features/auth/queries";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";
import { AuthFormSchemaValues } from "@/features/auth/auth-form.schema";
import { useSessionStore } from "@/features/session/session.store";

export function useSignup() {
    const sessionStore = useSessionStore();

    const signupMutation = useMutation({
        ...SignUpMutation,
        onSuccess: ({ data }) => {
            toast.success("Sign Up Successful");
            sessionStore.setSession({
                sub: data.payload.sub,
                email: data.payload.email,
            });
        },
        onError: (error) => {
            toast.error("Sign Up Failed", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleSignup = (values: AuthFormSchemaValues) => {
        signupMutation.mutate(values);
    };

    return {
        isLoading: signupMutation.isPending,
        handleSignup,
    };
}