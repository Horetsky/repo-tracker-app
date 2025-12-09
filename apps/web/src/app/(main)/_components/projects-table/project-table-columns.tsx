import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RefreshCcw, Trash } from "lucide-react";
import { ProjectsEntity } from "@/entities/project";

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
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("owner")}</div>
        ),
    },
    {
        accessorKey: "stars",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className={"float-end px-0 has-[>svg]:px-0"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Stars
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-right font-medium px-3">{row.getValue("stars")}</div>
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
            <div className="text-right font-medium px-3">{row.getValue("forks")}</div>
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
            <div className="text-right font-medium px-3">{row.getValue("issues")}</div>
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