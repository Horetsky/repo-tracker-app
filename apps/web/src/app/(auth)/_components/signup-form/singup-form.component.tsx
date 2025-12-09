"use client";

import { ComponentProps } from "react";
import { AuthForm } from "@/app/(auth)/_components/auth-form";
import { useSignup } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export namespace SignUpForm {
    export type Props = ComponentProps<"form">;
}

export const SignUpForm = (props: SignUpForm.Props) => {
    const {
        isLoading,
        handleSignup,
    } = useSignup();

    return (
        <AuthForm
            {...props}
            onSubmit={handleSignup}
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
                Sign up
            </Button>
        </AuthForm>
    );
};
