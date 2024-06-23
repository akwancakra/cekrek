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

const students: Student[] = [
    {
        id: "1",
        name: "Andreas Nathan",
        image: "/images/user-default.jpg",
        category: "Medium",
        old: 14,
    },
    {
        id: "2",
        name: "Jhony Itu",
        image: "/images/user-default.jpg",
        category: "High",
        old: 12,
    },
    {
        id: "3",
        name: "Kai Cenat",
        image: "/images/user-default.jpg",
        category: "Low",
        old: 14,
    },
    {
        id: "4",
        name: "Bianca Cenat",
        image: "/images/user-default.jpg",
        category: "High",
        old: 14,
    },
    {
        id: "5",
        name: "Doni Sitorus",
        image: "/images/user-default.jpg",
        category: "Medium",
        old: 15,
    },
];

const columns: ColumnDef<Student>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Name</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/t/students/${row.getValue("id")}`}
                        className="hover:text-primary"
                    >
                        <span>{row.getValue("name")}</span>
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Category</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "old",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Old</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
        cell: ({ row }) => {
            const old = parseFloat(row.getValue("old"));
            const formattedOld = old + " Years";

            return formattedOld;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const studentId = row.getValue("id");

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
                            <Link href={`/t/students/${studentId}`}>
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    contacts
                                </span>{" "}
                                Lihat detil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/t/students/${studentId}/assessment`}>
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    assignment
                                </span>{" "}
                                Buat asesmen
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link
                                href={`/t/students/${studentId}/recommendation`}
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    clinical_notes
                                </span>{" "}
                                Rekomendasi harian
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/t/students/${studentId}/edit`}>
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    edit
                                </span>{" "}
                                Ubah siswa
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600">
                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                delete
                            </span>{" "}
                            Hapus siswa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[];
//     data: TData[];
// }

export default function StudentsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [showSize, setShowSize] = useState(15);

    const table = useReactTable({
        data: students,
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
