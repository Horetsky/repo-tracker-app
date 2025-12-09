"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFormSchemaValues } from "@/features/auth/auth-form.schema";
import { useAuthForm } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";


export namespace AuthForm {
    export type Props = Omit<ComponentProps<"form">, "onSubmit"> & {
        onSubmit: (values: AuthFormSchemaValues) => void;
    };
}

export const AuthForm = ({
    onSubmit,
    className,
    children,
    ...props
}: AuthForm.Props) => {
    const form = useAuthForm();

    return (
        <form
            {...props}
            id={"auth-form"}
            className={cn(
                "[&_button]:w-full",
                className,
            )}
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FieldGroup className={"mb-8"}>
                <Controller
                    name={"email"}
                    control={form.control}
                    render={({ fieldState, field }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={"auth-form-email"}>
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type={"email"}
                                id={"auth-form-email"}
                                aria-invalid={fieldState.invalid}
                                placeholder={"Enter your email"}
                            />
                            {
                                fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )
                            }
                        </Field>
                    )}
                />
                <Controller
                    name={"password"}
                    control={form.control}
                    render={({ fieldState, field }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={"auth-form-password"}>
                                Password
                            </FieldLabel>
                            <Input
                                {...field}
                                type={"password"}
                                id={"sign-up-form-password"}
                                aria-invalid={fieldState.invalid}
                                placeholder={"Enter your password"}
                            />
                            {
                                fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )
                            }
                        </Field>
                    )}
                />
            </FieldGroup>
            { children }
        </form>
    );
};
