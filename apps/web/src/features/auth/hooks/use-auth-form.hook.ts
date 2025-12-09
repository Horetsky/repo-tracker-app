import { useForm } from "react-hook-form";
import { authFormSchema, AuthFormSchemaValues } from "@/features/auth/auth-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useAuthForm() {
    return useForm<AuthFormSchemaValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });
}