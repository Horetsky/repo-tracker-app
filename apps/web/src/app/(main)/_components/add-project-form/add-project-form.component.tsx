"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAddProjectForm } from "@/features/project/hooks";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ComponentProps } from "react";

export namespace AddProjectForm {
    export type Props = ComponentProps<"form">;
}

export const AddProjectForm = ({
    id = "add-project-form",
}: AddProjectForm.Props) => {
    const {
        form,
        handleAddProject,
    } = useAddProjectForm();

    return (
        <Dialog>
            <form
                id={id}
                onSubmit={form.handleSubmit(handleAddProject)}
            >
                <DialogTrigger asChild>
                    <Button size={"lg"}>
                        <Plus /> Add New
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Project</DialogTitle>
                        <DialogDescription>
                            Enter project path. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className={"mb-8"}>
                        <Controller
                            name={"path"}
                            control={form.control}
                            render={({ fieldState, field }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`${id}-path`}>
                                        Path
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={`${id}-path`}
                                        aria-invalid={fieldState.invalid}
                                        placeholder={"facebook/react"}
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                size={"lg"}
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            form={id}
                            size={"lg"}
                            type={"submit"}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};
