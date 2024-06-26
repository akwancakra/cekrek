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
import { useMemo, useState } from "react";
import Link from "next/link";
import { Child } from "@/types/children.types";
import { ChildAssesment } from "@/types/childAssesment.type";
import { childs } from "@/utils/tempData";
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

type ProcessedAssessment = {
    id: number;
    nama: string;
    score: string;
    date_time: Date;
    risk_category: "Rendah" | "Sedang" | "Tinggi";
};

interface AssessmentHistoryTableProps {
    keyword?: string;
}

const processAssessments = (assessments: Child[]): ProcessedAssessment[] => {
    return assessments
        .filter(
            (child): child is Child & { child_assesments: ChildAssesment[] } =>
                !!child.child_assesments && child.child_assesments.length > 0
        )
        .map((child) => {
            let totalLulus = 0;
            let totalGagal = 0;
            child.child_assesments.forEach((chass) => {
                totalLulus += chass.assesment.filter(
                    (assesment) => assesment.answer === "Lulus"
                ).length;
                totalGagal += chass.assesment.filter(
                    (assesment) => assesment.answer === "Gagal"
                ).length;
            });

            let risk_category: "Rendah" | "Sedang" | "Tinggi" = "Rendah";
            if (totalGagal >= 0 && totalGagal <= 2) {
                risk_category = "Rendah";
            } else if (totalGagal >= 3 && totalGagal <= 7) {
                risk_category = "Sedang";
            } else if (totalGagal >= 8 && totalGagal <= 20) {
                risk_category = "Tinggi";
            }

            return {
                id: child.id,
                nama: child.full_name,
                score: `${totalLulus}/${totalGagal}`,
                date_time: child.child_assesments[0].date_time,
                risk_category: risk_category,
            };
        });
};

const removeAssessmentButton = (id: number) => {
    console.log("Assessment Removed!");
};

// JALANIN FUNGSINYA
const historyAssessmen = processAssessments(childs);

const columns: ColumnDef<ProcessedAssessment>[] = [
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
            const assessmentId: string = row.getValue("id");

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
                            <Link href={`/t/assessments/${assessmentId}`}>
                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                    contacts
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
                                        className="w-full text-small py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                                    >
                                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                                            delete
                                        </span>
                                        <span>Hapus siswa</span>
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
                                                        parseInt(assessmentId)
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

    const [showSize, setShowSize] = useState(15);

    const filteredData = useMemo(() => {
        if (!keyword) return historyAssessmen;
        return historyAssessmen.filter((item) =>
            item.nama.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [keyword]);

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
