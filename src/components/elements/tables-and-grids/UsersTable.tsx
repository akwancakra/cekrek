"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Student } from "@/types/student.types";
import Link from "next/link";
import { User } from "@/types/user.types";

const users: User[] = [
    {
        id: "1",
        email: "sulis@mail.com",
        createdAt: "2022-01-01",
    },
    {
        id: "2",
        email: "tono@mail.com",
        createdAt: "2022-01-01",
    },
    {
        id: "3",
        email: "suprapto@mail.com",
        createdAt: "2022-01-01",
    },
    {
        id: "4",
        email: "haryono@mail.com",
        createdAt: "2022-01-01",
    },
    {
        id: "5",
        email: "subito@mail.com",
        createdAt: "2022-01-01",
    },
];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>ID</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Email</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "createdAt",
        cell: ({ row }) => {
            const formattedDate = new Date(
                row.getValue("createdAt")
            ).toLocaleDateString("id-ID", {
                year: "2-digit",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

            return <p className="text-sm text-gray-500">{formattedDate}</p>;
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Created At</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const userId = row.getValue("id");

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                                more_horiz
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/t/users/${userId}/edit`}>
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    edit
                                </span>{" "}
                                Ubah akun
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600">
                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                delete
                            </span>{" "}
                            Hapus akun
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function UsersTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [showSize, setShowSize] = useState(15);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: showSize,
            },
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    const sizeSet = ({ size }: { size: number }) => {
        setShowSize(size);
        table.setPageSize(size);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between space-x-2 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <span>Tampil {showSize}</span>
                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                                unfold_more
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Tampil Data</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => sizeSet({ size: 5 })}
                        >
                            5 data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => sizeSet({ size: 15 })}
                        >
                            15 data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => sizeSet({ size: 30 })}
                        >
                            30 data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => sizeSet({ size: 40 })}
                        >
                            40 data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => sizeSet({ size: 50 })}
                        >
                            50 data
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
