import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { ComponentProps } from "react";

export namespace ProjectTableActions {
    export type Props = ComponentProps<"div"> & {
        isRefreshing?: boolean;
        isDeleting?: boolean;
        onRefresh?: () => void;
        onDelete?: () => void;
    };
}

export const ProjectTableActions = ({
    isRefreshing,
    isDeleting,

    onRefresh,
    onDelete,

    className,
    ...props
}: ProjectTableActions.Props) => {
    return (
        <div
            className={cn(
                "float-end flex items-center gap-2",
                className,
            )}
            {...props}
        >
            <Button
                size={"icon"}
                variant={"outline"}
                onClick={onRefresh}
            >
                <RefreshCcw
                    className={cn(
                        isRefreshing && "animate-spin",
                    )}
                />
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        size={"icon"}
                        variant={"destructive"}
                    >
                        {
                            isDeleting ? <Spinner /> : <Trash />
                        }
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this project.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className={"h-12"}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onDelete}
                            className={"h-12"}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
