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
import { User } from "@/types/user.types";
import { capitalizeFirstLetter } from "@/utils/formattedDate";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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

interface UsersTableProps {
    users: User[];
    keyword: string;
}

export default function UsersTable({ users, keyword }: UsersTableProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [showSize, setShowSize] = useState(15);

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

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
                        <span>Nama</span>
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
            accessorKey: "role",
            cell: ({ row }) => {
                const role: string = row.getValue("role");
                return role ? capitalizeFirstLetter(role) : "N/A";
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
                        <span>Peran</span>
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                            swap_vert
                        </span>
                    </Button>
                );
            },
        },
        {
            accessorKey: "created_at",
            cell: ({ row }) => {
                const formattedDate = new Date(
                    row.getValue("created_at")
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
                        <span>Tanggal dibuat</span>
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
                const userId: string = row.getValue("id");

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
                                <Link href={`/a/users/${userId}/edit`}>
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        edit
                                    </span>{" "}
                                    Ubah akun
                                </Link>
                            </DropdownMenuItem>
                            {isDesktop ? (
                                <UserDeleteDialog
                                    user={row.original}
                                    removeUser={removeUser}
                                    isLoading={isLoading}
                                />
                            ) : (
                                <UserDeleteDrawer
                                    user={row.original}
                                    removeUser={removeUser}
                                    isLoading={isLoading}
                                />
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const filteredData = useMemo(() => {
        if (!keyword) return users ?? [];
        return (users ?? []).filter((item: User) =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [keyword, users]);

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

    const removeUser = (id: string) => {
        setIsLoading(true);

        const submitPromise = new Promise<void>(async (resolve, reject) => {
            try {
                await axios.delete(`/api/users/${id}`);

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
                return "Berhasil menghapus akun!";
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

const UserDeleteDrawer = ({
    user,
    removeUser,
    isLoading,
}: {
    user: User;
    removeUser: (id: string) => void;
    isLoading: boolean;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                    >
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                            delete
                        </span>
                        <span>Hapus akun</span>
                    </button>
                </DrawerTrigger>
                <DrawerContent className="p-0">
                    <ScrollArea className="max-h-[70vh] p-0">
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Hapus akun</DrawerTitle>
                            <DrawerDescription>
                                <div>
                                    Ini akan menghapus data akun{" "}
                                    <span className="font-semibold">
                                        {user?.name}
                                    </span>{" "}
                                    dan tidak bisa dikembalikan.
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="pt-2">
                            <Button
                                variant={"default"}
                                onClick={() => removeUser(user.id.toString())}
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

const UserDeleteDialog = ({
    user,
    removeUser,
    isLoading,
}: {
    user: User;
    removeUser: (id: string) => void;
    isLoading: boolean;
}) => {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        type="button"
                        className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600"
                    >
                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
                            delete
                        </span>
                        <span>Hapus akun</span>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-0">
                    <ScrollArea className="max-h-[80vh] p-3">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Apakah kamu yakin?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Ini akan menghapus data akun{" "}
                                <span className="font-semibold">
                                    {user?.name}
                                </span>{" "}
                                dan tidak bisa dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-3">
                            <AlertDialogCancel disabled={isLoading}>
                                Batal
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    variant={"destructive"}
                                    onClick={() =>
                                        removeUser(user.id.toString())
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
