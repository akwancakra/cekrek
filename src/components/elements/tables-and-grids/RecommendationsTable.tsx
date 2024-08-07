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
import { Recommendation } from "@/types/recommendation.type";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    keyword: string;
}

export default function RecommendationsTable({ keyword }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 15, //default page size
    });

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

    const columns: ColumnDef<Recommendation>[] = [
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
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="gap-1 p-0 px-1"
                    >
                        <span>Judul</span>
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                            swap_vert
                        </span>
                    </Button>
                );
            },
        },
        {
            accessorKey: "risk_category",
            cell: ({ row }) => {
                const category: string = row.getValue("risk_category");
                return category ? capitalizeFirstLetter(category) : "N/A";
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
                        <span>Kategori Risiko</span>
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                            swap_vert
                        </span>
                    </Button>
                );
            },
        },
        {
            accessorKey: "is_main",
            cell: ({ row }) => {
                const main: boolean = row.getValue("is_main");
                return main ? "Ya" : "Tidak";
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
                        <span>Utama</span>
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
                const rekomendasiId = row.getValue("id");

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
                                <Link
                                    href={`/a/recommendations/${rekomendasiId}/edit`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        edit
                                    </span>{" "}
                                    Ubah rekomendasi
                                </Link>
                            </DropdownMenuItem>
                            {isDesktop ? (
                                <RecommendationDeleteDialog
                                    recommendation={row.original}
                                    removeRecommendation={removeRecommendation}
                                    isLoading={isLoading}
                                />
                            ) : (
                                <RecommendationDeleteDrawer
                                    recommendation={row.original}
                                    removeRecommendation={removeRecommendation}
                                    isLoading={isLoading}
                                />
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const fetchRecommendations = async ({ pageParam = 0 }) => {
        const res = await axios.get(`/api/recommendations`, {
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
        queryKey: ["recommendations"],
        queryFn: fetchRecommendations,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    // const filteredData = useMemo(() => {
    //     if (!keyword) return recommendations ?? [];
    //     return (recommendations ?? []).filter((item: Recommendation) =>
    //         item.title.toLowerCase().includes(keyword.toLowerCase())
    //     );
    // }, [keyword, recommendations]);

    const recommendations: Recommendation[] = useMemo(() => {
        return (
            data?.pages.flatMap((page) => {
                if (page?.message || page?.recommendations?.length === 0) {
                    return [];
                }

                return page.recommendations;
            }) || []
        );
    }, [data]);

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

    const table = useReactTable({
        data: recommendations || [],
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

    const handleNextPage = async () => {
        const hasMoreData = recommendations.length < totalCount;

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

    const removeRecommendation = (id: string) => {
        setIsLoading(true);

        const submitPromise = new Promise<void>(async (resolve, reject) => {
            try {
                await axios.delete(`/api/recommendations/${id}`);

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
                return "Berhasil menghapus rekomendasi!";
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

const RecommendationDeleteDrawer = ({
    recommendation,
    removeRecommendation,
    isLoading,
}: {
    recommendation: Recommendation;
    removeRecommendation: (id: string) => void;
    isLoading: boolean;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600 dark:bg-red-600 dark:text-red-100 dark:hover:!bg-red-700 dark:hover:!text-red-200"
                    >
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                            delete
                        </span>
                        <span>Hapus rekomendasi</span>
                    </button>
                </DrawerTrigger>
                <DrawerContent className="p-0">
                    <ScrollArea className="max-h-[70vh] p-0">
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Hapus akun</DrawerTitle>
                            <DrawerDescription>
                                <div>
                                    Ini akan menghapus data rekomendasi{" "}
                                    <span className="font-semibold">
                                        {recommendation?.title}
                                    </span>{" "}
                                    dan tidak bisa dikembalikan.
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="pt-2">
                            <Button
                                variant={"default"}
                                onClick={() =>
                                    removeRecommendation(
                                        recommendation.id.toString()
                                    )
                                }
                                className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                disabled={isLoading}
                            >
                                Hapus
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    className="text-medium"
                                    disabled={isLoading}
                                >
                                    Batal
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        </>
    );
};

const RecommendationDeleteDialog = ({
    recommendation,
    removeRecommendation,
    isLoading,
}: {
    recommendation: Recommendation;
    removeRecommendation: (id: string) => void;
    isLoading: boolean;
}) => {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        type="button"
                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600 dark:bg-red-600 dark:text-red-100 dark:hover:!bg-red-700 dark:hover:!text-red-200"
                    >
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                            delete
                        </span>
                        <span>Hapus rekomendasi</span>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-0">
                    <ScrollArea className="max-h-[80vh] p-3">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Apakah kamu yakin?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Ini akan menghapus data rekomendasi{" "}
                                <span className="font-semibold">
                                    {recommendation?.title}
                                </span>{" "}
                                dan tidak bisa dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>
                                Batal
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    variant={"destructive"}
                                    onClick={() =>
                                        removeRecommendation(
                                            recommendation.id.toString()
                                        )
                                    }
                                    className="bg-red-500 text-white hover:bg-red-700"
                                    disabled={isLoading}
                                >
                                    Hapus
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </ScrollArea>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
