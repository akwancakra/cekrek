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
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Child } from "@/types/children.types";
import { capitalizeFirstLetter } from "@/utils/formattedDate";
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
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

interface StudentsTableProps {
    keyword: string;
    link: string;
    role: string;
}

export default function StudentsTable({
    keyword,
    link,
    role = "a",
}: StudentsTableProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 15, //default page size
    });

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

    const columns: ColumnDef<Child>[] = [
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
            accessorKey: "full_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="gap-1 p-0 px-1"
                    >
                        <span>Nama</span>
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
                            href={`/${role}/students/${row.getValue("id")}`}
                            className="hover:text-primary"
                        >
                            <span>{row.getValue("full_name")}</span>
                        </Link>
                    </div>
                );
            },
        },
        {
            accessorKey: "risk_category",
            cell: ({ row }) => {
                const category: string = row.getValue("risk_category");

                if (category) {
                    return capitalizeFirstLetter(category);
                }
                return "N/A";
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
                        <span>Kategori</span>
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                            swap_vert
                        </span>
                    </Button>
                );
            },
        },
        {
            accessorKey: "last_assesment",
            cell: ({ row }) => {
                const lastAssessment: string = row.getValue("last_assesment");
                const formattedDate = new Date(
                    lastAssessment
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
                        <span>Terakhir Asesmen</span>
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
                const studentId: string = row.getValue("id");

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
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href={`/${role}/students/${studentId}`}>
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        contacts
                                    </span>{" "}
                                    Lihat detil
                                </Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href={`/a/students/${studentId}/edit`}>
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        assignment
                                    </span>{" "}
                                    Lakukan asesmen
                                </Link>
                            </DropdownMenuItem> */}
                            {/* <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href={`/a/students/${studentId}/recommendation`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        clinical_notes
                                    </span>{" "}
                                    Lakukan monitoring
                                </Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href={`/${role}/students/${studentId}/edit`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        edit
                                    </span>{" "}
                                    Ubah siswa
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
                                            className="w-full text-small py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600 dark:bg-red-600 dark:text-red-100 dark:hover:!bg-red-700 dark:hover:!text-red-200"
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
                                                        removeChildren(
                                                            studentId
                                                        )
                                                    }
                                                    className="bg-red-500 text-white hover:bg-red-700"
                                                >
                                                    Hapus siswa
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

    // const filteredData = useMemo(() => {
    //     if (!keyword) return students;
    //     return students.filter((item) =>
    //         item.full_name.toLowerCase().includes(keyword.toLowerCase())
    //     );
    // }, [keyword]);

    // const filteredData = useMemo(() => {
    //     if (!keyword) return students;
    //     return students.filter((item) => {
    //         const matchesKeyword = item.full_name
    //             .toLowerCase()
    //             .includes(keyword.toLowerCase());
    //         return matchesKeyword;
    //     });
    // }, [students, keyword]);

    const fetchChildren = async ({ pageParam = 0 }) => {
        const res = await axios.get(link, {
            params: {
                plain: true,
                limit: pagination.pageSize,
                skip: pageParam,
                name: keyword,
            },
        });
        return res.data;
    };

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading: isLoadingData,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["children"],
        queryFn: fetchChildren,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const children: Child[] = useMemo(() => {
        return (
            data?.pages.flatMap((page) => {
                if (page?.message || page?.children?.length === 0) {
                    return [];
                }

                return page.children;
            }) || []
        );
    }, [data]);

    const table = useReactTable({
        data: children || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: pagination.pageSize,
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

    const previousTotalCountRef = useRef(0);
    const totalCount = useMemo(() => {
        if (data?.pages) {
            const pageWithTotalCount = data.pages.find(
                (page) => !page.message && page.totalCount
            );
            const newTotalCount =
                pageWithTotalCount?.totalCount ?? previousTotalCountRef.current;
            previousTotalCountRef.current = newTotalCount;
            return newTotalCount;
        }
        return previousTotalCountRef.current;
    }, [data]);

    const handleNextPage = async () => {
        const hasMoreData = children.length < totalCount;

        if (table.getCanNextPage()) {
            table.nextPage();
        } else if (hasNextPage && hasMoreData) {
            await fetchNextPage();
        }
    };

    const handlePreviousPage = () => {
        if (table.getCanPreviousPage()) {
            table.previousPage();
        }
    };

    const sizeSet = ({ size }: { size: number }) => {
        setPagination({ ...pagination, pageSize: size });
        table.setPageSize(size);
    };

    const removeChildren = (id: string) => {
        setIsLoading(true);

        const submitPromise = new Promise<void>(async (resolve, reject) => {
            try {
                await axios.delete(`/api/children/${id}`);

                resolve();
            } catch (error) {
                reject(error);
            }
        });

        toast.promise(submitPromise, {
            loading: "Mengirimkan data...",
            success: () => {
                setIsLoading(false);
                router.refresh();
                return "Berhasil menghapus siswa!";
            },
            error: (data: any) => {
                setIsLoading(false);
                if (data?.response?.status === 400) {
                    return data?.response?.data?.message;
                } else if (data?.response?.status === 500) {
                    return "Server Error";
                } else {
                    return "Terjadi kesalahan";
                }
            },
        });
    };

    useEffect(() => {
        refetch(); // Refetch data when keyword changes
    }, [keyword, refetch]);

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

            {isLoadingData && (
                <div className="text-center text-sm my-3">
                    Memuat data baru...
                </div>
            )}

            <div className="flex items-center justify-between space-x-2 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <span>Tampil {pagination.pageSize}</span>
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
                        onClick={handlePreviousPage}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleNextPage}
                        disabled={
                            isLoadingData || isFetchingNextPage || !hasNextPage
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
