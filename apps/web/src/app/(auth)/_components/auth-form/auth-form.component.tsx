"use client";

import { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
});
type Schema = z.infer<typeof schema>;

export namespace AuthForm {
    export type Props = Omit<ComponentProps<"form">, "onSubmit"> & {
        onSubmit: (values: Schema) => void;
    };
}

export const AuthForm = ({
    onSubmit,
    ...props
}: AuthForm.Props) => {

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    return (
        <form
            {...props}
            id={"auth-form"}
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
            <Button
                size={"lg"}
                type={"submit"}
                form={"auth-form"}
                className={"w-full"}
            >
                Submit
            </Button>
        </form>
    );
};
