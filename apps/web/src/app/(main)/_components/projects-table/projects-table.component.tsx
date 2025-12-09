"use client";

import * as React from "react";
import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    Table,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Table as TableRoot, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projectTableColumns } from "./project-table-columns";
import { ProjectsEntity, ProjectSyncStatus } from "@/entities/project";
import { useProjectActions, useProjectTable } from "@/features/project/hooks";
import { cn } from "@/lib/utils";

export function ProjectsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);

    const {
        projects,
        pagination,
        setPagination,
    } = useProjectTable();

    const {
        isRefreshing,
        handleRefreshProject,

        isDeleting,
        handleDeleteProject,
    } = useProjectActions(pagination);

    const table = useReactTable({
        data: projects?.data || [],
        columns: projectTableColumns,
        rowCount: projects?.pagination.totalItems,
        manualPagination: true,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

        onSortingChange: setSorting,
        onPaginationChange: setPagination,

        state: {
            sorting,
            pagination,
        },

        meta: {
            isRefreshing,
            handleRefreshProject,

            isDeleting,
            handleDeleteProject,
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
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
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
                            className={cn(
                                row.original.syncStatus === ProjectSyncStatus.PENDING && "opacity-50 pointer-events-none",
                            )}
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