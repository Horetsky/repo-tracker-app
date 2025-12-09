"use client";

import { AuthForm } from "../auth-form";
import { ComponentProps } from "react";

export namespace LoginForm {
    export type Props = ComponentProps<"form">;
}

export const LoginForm = (props: LoginForm.Props) => {
    return (
        <AuthForm
            {...props}
            onSubmit={() => {

            }}
        />
    );
};
