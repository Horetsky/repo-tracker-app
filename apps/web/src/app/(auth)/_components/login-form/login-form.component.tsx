"use client";

import { AuthForm } from "../auth-form";
import { ComponentProps } from "react";
import { useLogin } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export namespace LoginForm {
    export type Props = ComponentProps<"form">;
}

export const LoginForm = (props: LoginForm.Props) => {
    const {
        isLoading,
        handleLogin,
    } = useLogin();

    return (
        <AuthForm
            {...props}
            onSubmit={handleLogin}
        >
            <Button
                size={"lg"}
                type={"submit"}
            >
                {
                    isLoading && (
                        <Spinner />
                    )
                }
                Login
            </Button>
        </AuthForm>
    );
};
