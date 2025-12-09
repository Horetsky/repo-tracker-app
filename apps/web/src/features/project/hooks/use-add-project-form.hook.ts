import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectFormSchema, AddProjectFormSchemaValues } from "@/features/project/add-project-form.schema";
import { useMutation } from "@tanstack/react-query";
import { AddProjectMutation } from "@/features/project/queries";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios/utils";
import { useState } from "react";

export function useAddProjectForm() {
    const [open, setOpen] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(addProjectFormSchema),
        defaultValues: {
            path: "",
        },
    });

    const addProjectMutation = useMutation({
        ...AddProjectMutation,
        onSettled: () => {
            form.reset();
            setOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to add project", {
                description: getErrorMessage(error),
            });
        },
    });

    const handleAddProject = (values: AddProjectFormSchemaValues) => {
        const [owner, name] = values.path.split("/");
        addProjectMutation.mutate({ owner, name });
    };

    return {
        open,
        setOpen,

        form,
        handleAddProject,
        isLoading: addProjectMutation.isPending,
    };
}