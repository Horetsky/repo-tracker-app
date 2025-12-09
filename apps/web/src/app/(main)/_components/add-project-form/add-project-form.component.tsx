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
import { Spinner } from "@/components/ui/spinner";

export namespace AddProjectForm {
    export type Props = ComponentProps<"form">;
}

export const AddProjectForm = ({
    id = "add-project-form",
}: AddProjectForm.Props) => {
    const {
        open,
        setOpen,

        form,
        handleAddProject,
        isLoading,
    } = useAddProjectForm();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <FieldGroup>
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
                            {
                                isLoading && (
                                    <Spinner />
                                )
                            }
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};
