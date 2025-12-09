import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RefreshCcw, Star, Stars, Trash } from "lucide-react";
import { ProjectsEntity } from "@/entities/project";
import Link from "next/link";
import Image from "next/image";

export const projectTableColumns: ColumnDef<ProjectsEntity>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
        id: "actions",
        header: () => {
            return (
                <div className={"text-right"}>Actions</div>
            );
        },
        cell: () => (
            <div className={"float-end flex items-center gap-2"}>
                <Button
                    size={"icon"}
                    variant={"outline"}
                >
                    <RefreshCcw />
                </Button>
                <Button
                    size={"icon"}
                    variant={"destructive"}
                >
                    <Trash />
                </Button>
            </div>
        ),
    },
];