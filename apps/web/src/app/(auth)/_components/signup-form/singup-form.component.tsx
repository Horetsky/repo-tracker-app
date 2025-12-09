"use client";

import { ComponentProps } from "react";
import { AuthForm } from "@/app/(auth)/_components/auth-form";

export namespace SignUpForm {
    export type Props = ComponentProps<"form">;
}

export const SignUpForm = (props: SignUpForm.Props) => {
    return (
        <AuthForm
            {...props}
            onSubmit={() => {

            }}
        />
    );
};
