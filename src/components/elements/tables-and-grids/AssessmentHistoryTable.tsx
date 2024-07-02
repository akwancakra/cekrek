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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    capitalizeFirstLetter,
    formattedDateStripYearFirst,
} from "@/utils/formattedDate";
import { processMultiChildAssessments } from "@/utils/converters";
import { ProcessedAssessment } from "@/types/processedAssessments.type";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Child } from "@/types/children.types";

interface AssessmentHistoryTableProps {
    keyword?: string;
}

const removeAssessmentButton = (id: number, date: string) => {
    console.log("Assessment Removed!");
};

// JALANIN FUNGSINYA
const columns: ColumnDef<ProcessedAssessment>[] = [
    {
        accessorKey: "child_id",
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
        accessorKey: "type",
        cell: ({ row }) => {
            const type: string = row.getValue("type");
            return capitalizeFirstLetter(type);
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
                    <span>Tipe</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Siswa</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "risk_category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Kategori</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "score",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-1 p-0 px-1"
                >
                    <span>Lulus/Gagal</span>
                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                        swap_vert
                    </span>
                </Button>
            );
        },
    },
    {
        accessorKey: "date_time",
        cell: ({ row }) => {
            const formattedDate = new Date(
                row.getValue("date_time")
            ).toLocaleDateString("id-ID", {
                year: "2-digit",
                month: "short",
                day: "numeric",
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
                    <span>Waktu Asesmen</span>
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
            // const assessmentId: string = row.getValue("id");
            const childId: string = row.getValue("child_id");
            const assessmentDate: string = row.getValue("date_time");
            const formattedDate: string =
                formattedDateStripYearFirst(assessmentDate);

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
                            <Link
                                href={`/t/assessments/${childId}?date=${formattedDate}`}
                            >
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    assignment
                                </span>{" "}
                                Lihat detil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                            asChild
                        >
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                    >
                                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                            delete
                                        </span>
                                        <span>Hapus asesmen</span>
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Apakah kamu yakin?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Ini akan menghapus data{" "}
                                            <span className="font-semibold">
                                                Dwiky Putra
                                            </span>{" "}
                                            dan tidak bisa dikembalikan, dan
                                            berikut rincian data yang akan
                                            dihapus:
                                            <span className="block mt-1">
                                                &gt; Data profil anak
                                            </span>
                                            <span className="block">
                                                &gt; Data riwayat asesmen
                                            </span>
                                            <span className="block">
                                                &gt; Data rekomendasi
                                            </span>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Batal
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button
                                                variant={"destructive"}
                                                onClick={() =>
                                                    removeAssessmentButton(
                                                        parseInt(childId),
                                                        formattedDate
                                                    )
                                                }
                                                className="bg-red-500 text-white hover:bg-red-700"
                                            >
                                                Hapus
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function AssessmentHistoryTable({
    keyword,
}: AssessmentHistoryTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [historyAssessmen, setHistoryAssessmen] = useState<
        ProcessedAssessment[] | undefined
    >(undefined);

    const [showSize, setShowSize] = useState(15);

    const {
        data,
        isLoading,
    }: {
        data: { status: string; childrenAssessments: Child[] };
        isLoading: boolean;
    } = useSWR(`/api/teachers/${1}/child-assessments`, fetcher);

    useEffect(() => {
        if (data) {
            // console.log(data);
            const history = processMultiChildAssessments(
                data.childrenAssessments
            );

            setHistoryAssessmen(history);
        }
    }, [data]);

    const filteredData = useMemo(() => {
        if (!keyword) return historyAssessmen ?? [];
        return (historyAssessmen ?? []).filter((item: ProcessedAssessment) =>
            item.nama.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [keyword, historyAssessmen]);

    const table = useReactTable({
        data: filteredData,
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
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Mendapatkan data...
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={
                                    row.getIsSelected() ? "selected" : undefined
                                }
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
                                Tidak ada data asesmen siswa
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
