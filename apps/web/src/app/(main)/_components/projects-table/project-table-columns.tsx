import { ColumnDef, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RefreshCcw, Trash } from "lucide-react";
import { ProjectsEntity, ProjectSyncStatus } from "@/entities/project";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        isRefreshing: (id: string) => boolean;
        handleRefreshProject: (id: string) => void;

        isDeleting: (id: string) => boolean;
        handleDeleteProject: (id: string) => void;
    }
}

export const projectTableColumns: ColumnDef<ProjectsEntity>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <Link
                href={row.original.url}
                target={"_blank"}
                className={"capitalize"}
            >
                {row.getValue("name")}
            </Link>
        ),
    },
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => {
            const owner = row.original.ownerDetails;

            if(owner) {
                return (
                    <Link
                        href={owner.html_url}
                        className={"capitalize flex items-center gap-1"}
                        target={"_blank"}
                    >
                        <Image
                            src={owner.avatar_url}
                            width={30}
                            height={30}
                            className={"rounded-full mr-2"}
                            alt={`${owner.login} avatar`}
                        />
                        { row.getValue("owner") }
                    </Link>
                );
            }

            return (
                <div className={"capitalize"}>{row.getValue("owner")}</div>
            );
        },
    },
    {
        accessorKey: "stars",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={"float-end"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Stars
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-right px-3">{row.getValue("stars")}</div>
        ),
    },
    {
        accessorKey: "forks",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={"float-end"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Forks
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-right px-3">{row.getValue("forks")}</div>
        ),
    },
    {
        accessorKey: "issues",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={"float-end"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Issues
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-right px-3">{row.getValue("issues")}</div>
        ),
    },
    {
        accessorKey: "githubCreatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={"float-end"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.getValue("githubCreatedAt") as string | null;

            let unix: string = "-";

            if(value) {
                unix = Math.floor(new Date(value).getTime() / 1000).toString();
            }

            return (
                <div className="text-right px-3">{ unix }</div>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div className={"text-right"}>Actions</div>
            );
        },
        cell: ({ row, table }) => {
            const projectId = row.original.id;
            const handleRefresh = table.options.meta?.handleRefreshProject;
            const isRefreshing = table.options.meta?.isRefreshing(projectId) || row.original.syncStatus === ProjectSyncStatus.PENDING;

            const handleDelete = table.options.meta?.handleDeleteProject;
            const isDeleting = table.options.meta?.isDeleting(projectId) || false;

            return (
                <div className={"float-end flex items-center gap-2"}>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => handleRefresh?.(projectId)}
                    >
                        <RefreshCcw
                            className={cn(
                                isRefreshing && "animate-spin",
                            )} 
                        />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => handleDelete?.(projectId)}
                    >
                        {
                            isDeleting ? <Spinner /> : <Trash />
                        }
                    </Button>
                </div>
            );
        },
    },
];