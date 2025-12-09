"use client";

import * as React from "react";
import {
    Table,
    flexRender,
    getCoreRowModel,
    useReactTable, SortingState, getSortedRowModel, getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    Table as TableRoot,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { projectTableColumns } from "./project-table-columns";
import { ProjectsEntity } from "@/entities/project";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUserProjectsQuery } from "@/features/project/queries";

export function ProjectsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);

    const {
        data: projects,
    } = useQuery(GetCurrentUserProjectsQuery());

    const table = useReactTable({
        data: projects?.data.data || [],
        columns: projectTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onSortingChange: setSorting,

        state: {
            sorting,
        },
    });

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-md border">
                <TableRoot>
                    <Header {...table} />
                    <Body {...table} />
                </TableRoot>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

const Header = (table: Table<ProjectsEntity>) => {
    return (
        <TableHeader>
            {
                table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {
                            headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {
                                            header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )
                                        }
                                    </TableHead>
                                );
                            })
                        }
                    </TableRow>
                ))
            }
        </TableHeader>
    );
};

const Body = (table: Table<ProjectsEntity>) => {
    return (
        <TableBody>
            {
                table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {
                                row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={projectTableColumns.length}
                            className="h-24 text-center"
                        >
                            No projects.
                        </TableCell>
                    </TableRow>
                )}
        </TableBody>
    );
};