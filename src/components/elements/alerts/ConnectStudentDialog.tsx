"use client";

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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Child } from "@/types/children.types";
import { getChildrenImage } from "@/utils/fetcher";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import useProfile from "@/utils/useProfile";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

export default function ConnectStudentDialog({
    className,
    students,
    mutate,
    children,
}: {
    mutate: () => void;
    className?: string;
    students: Child[];
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");
    const [selectedProfile, setSelectedProfile] = useState<Child | undefined>();
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 15, //default page size
    });

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { profile, isReady } = useProfile();

    /**
     * Fetches children from the API.
     * Ini buat dapetin data children atau siswa dari API
     */
    const fetchChildren = async ({ pageParam = 0 }) => {
        const res = await axios.get("/api/children", {
            params: {
                plain: true,
                limit: pagination.pageSize,
                skip: pageParam,
                // name: search,
            },
        });
        return res.data;
    };

    const {
        data,
        status,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["children"],
        queryFn: fetchChildren,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    // Filter students data to remove any that are already in the students parameter
    const filteredChildren = useMemo(() => {
        const studentIds = new Set(students.map((student) => student.id));
        return (
            data?.pages.flatMap((page) =>
                page.children.filter((child) => !studentIds.has(child.id))
            ) || []
        );
    }, [data, students]);

    // const filteredStudents = students.filter(
    //     (student) =>
    //         student.full_name.toLowerCase().includes(search.toLowerCase()) ||
    //         student?.risk_category?.toLowerCase().includes(search.toLowerCase())
    // );

    const getStudentById = (studentId: string) => {
        const student: Child | undefined = filteredChildren.find(
            (std) => std.id.toString() === studentId
        );

        setSelectedProfile(student);
    };

    useEffect(() => {
        getStudentById(value);
    }, [value]);

    const connectStudentButton = async () => {
        setIsLoadingPost(true);

        if (!isReady && !profile?.id) {
            return toast.error(
                "Tidak dapat menambahkan siswa, silahkan coba lagi!"
            );
        }

        if (!selectedProfile?.id) {
            return toast.error("Pilih siswa terlebih dahulu!");
        }

        const postData = {
            teacher_id: profile?.id,
            student_id: selectedProfile?.id,
        };

        await axios
            .put(`/api/teachers/${profile?.id}/students/add`, postData)
            .then((res) => {
                toast.success("Siswa berhasil ditambahkan!");
                setIsLoadingPost(false);

                setSelectedProfile(undefined);
                mutate();
            })
            .catch((err) => {
                if (err?.response.status === 400) {
                    toast.error(err?.response?.data?.message);
                } else if (err?.response.status === 500) {
                    toast.error("Server Error");
                } else {
                    toast.error("Terjadi kesalahan");
                }
                setIsLoadingPost(false);
            });
    };

    if (isDesktop) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
                <AlertDialogContent className="p-0">
                    <ScrollArea className="max-h-[80vh] p-3">
                        <AlertDialogHeader className="m-1">
                            <AlertDialogTitle>Tambah Siswa</AlertDialogTitle>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <div>
                                <AspectRatio ratio={12 / 13}>
                                    <Image
                                        src={
                                            selectedProfile?.picture
                                                ? getChildrenImage(
                                                      selectedProfile.picture
                                                  )
                                                : "/static/images/user-default.jpg"
                                        }
                                        alt="Child Profile"
                                        fill={true}
                                        className="rounded-lg object-cover"
                                        draggable={false}
                                    />
                                    <div className="absolute bottom-0 w-full">
                                        <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                            <Popover
                                                open={open}
                                                onOpenChange={setOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-fit justify-start"
                                                    >
                                                        <StudentItem
                                                            student={
                                                                selectedProfile
                                                            }
                                                        />
                                                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                            unfold_more
                                                        </span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-full p-0"
                                                    align="start"
                                                >
                                                    <Command className="w-96">
                                                        <CommandInput
                                                            placeholder="Cari nama anak..."
                                                            value={search}
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setSearch(value)
                                                            }
                                                        />
                                                        {/* <div className="p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Cari siswa..."
                                                                value={search}
                                                                onChange={(e) =>
                                                                    setSearch(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full p-2 border-b border-gray-300 text-small"
                                                            />
                                                        </div> */}
                                                        <CommandList>
                                                            {isFetching ||
                                                            status ===
                                                                "pending" ? (
                                                                <CommandEmpty>
                                                                    Mendapatkan
                                                                    data...
                                                                </CommandEmpty>
                                                            ) : (
                                                                <>
                                                                    <CommandEmpty>
                                                                        Tidak
                                                                        ada
                                                                        data.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {filteredChildren.map(
                                                                            (
                                                                                student
                                                                            ) => (
                                                                                <CommandItem
                                                                                    key={
                                                                                        student.id
                                                                                    }
                                                                                    value={
                                                                                        student.id.toString() +
                                                                                        "-" +
                                                                                        student.full_name
                                                                                    }
                                                                                    onSelect={(
                                                                                        value
                                                                                    ) => {
                                                                                        const studentId =
                                                                                            value.split(
                                                                                                "-"
                                                                                            )[0];

                                                                                        setValue(
                                                                                            studentId
                                                                                        );
                                                                                        setOpen(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <StudentItem
                                                                                        student={
                                                                                            student
                                                                                        }
                                                                                    />
                                                                                </CommandItem>
                                                                            )
                                                                        )}
                                                                    </CommandGroup>
                                                                    {hasNextPage && (
                                                                        <CommandItem
                                                                            asChild
                                                                            value={
                                                                                "z " +
                                                                                search
                                                                            }
                                                                        >
                                                                            <Button
                                                                                onClick={() =>
                                                                                    fetchNextPage()
                                                                                }
                                                                                disabled={
                                                                                    isFetchingNextPage
                                                                                }
                                                                                className="cursor-pointer w-full flex justify-center items-center text-small p-4 transition-all ease-in-out hover:bg-gray-200 dark:hover:bg-neutral-700"
                                                                            >
                                                                                {isFetchingNextPage
                                                                                    ? "Memuat data..."
                                                                                    : "Lihat Lainnya"}
                                                                            </Button>
                                                                        </CommandItem>
                                                                    )}
                                                                </>
                                                            )}
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </AspectRatio>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Nama
                                    </p>
                                    <p>{selectedProfile?.full_name || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Kategori
                                    </p>
                                    <p>
                                        {selectedProfile?.risk_category
                                            ? capitalizeFirstLetter(
                                                  selectedProfile?.risk_category
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Jenis Kelamin
                                    </p>
                                    <p>
                                        {selectedProfile?.gender
                                            ? capitalizeFirstLetter(
                                                  selectedProfile?.gender
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Tanggal Lahir
                                    </p>
                                    <p>
                                        {selectedProfile?.date_time_birth
                                            ? formattedDate(
                                                  selectedProfile.date_time_birth.toString()
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                            {/* {selectedProfile?.id && (
                                <Button
                                    variant={"outline"}
                                    className="w-full"
                                    asChild
                                >
                                    <Link
                                        href={`/t/students/${selectedProfile?.id}`}
                                        target="_blank"
                                    >
                                        Lihat detil
                                    </Link>
                                </Button>
                            )} */}
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <AlertDialogDescription />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    variant={"default"}
                                    onClick={() => connectStudentButton()}
                                    disabled={!selectedProfile}
                                >
                                    Tambah
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </ScrollArea>
                </AlertDialogContent>
            </AlertDialog>
        );
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>{children}</DrawerTrigger>
                <DrawerContent className="p-0">
                    <ScrollArea className="p-0">
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Tambah Siswa</DrawerTitle>
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <div>
                                <AspectRatio ratio={12 / 13}>
                                    <Image
                                        src={
                                            selectedProfile?.picture
                                                ? getChildrenImage(
                                                      selectedProfile.picture
                                                  )
                                                : "/static/images/user-default.jpg"
                                        }
                                        alt="Child Profile"
                                        fill={true}
                                        className="rounded-lg object-cover"
                                        draggable={false}
                                    />
                                    <div className="absolute bottom-0 w-full">
                                        <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                            <Popover
                                                open={popoverOpen}
                                                onOpenChange={setPopoverOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full h-fit justify-start"
                                                    >
                                                        <StudentItem
                                                            student={
                                                                selectedProfile
                                                            }
                                                        />
                                                        <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                                            unfold_more
                                                        </span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-full p-0"
                                                    align="start"
                                                >
                                                    <Command className="w-80">
                                                        <CommandInput
                                                            placeholder="Cari nama anak..."
                                                            value={search}
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setSearch(value)
                                                            }
                                                        />
                                                        {/* <div className="p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Cari siswa..."
                                                                value={search}
                                                                onChange={(e) =>
                                                                    setSearch(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full p-2 border-b border-gray-300 text-small"
                                                            />
                                                        </div> */}
                                                        <CommandList>
                                                            {isFetching ||
                                                            status ===
                                                                "pending" ? (
                                                                <CommandEmpty>
                                                                    Mendapatkan
                                                                    data...
                                                                </CommandEmpty>
                                                            ) : (
                                                                <>
                                                                    <CommandEmpty>
                                                                        Tidak
                                                                        ada
                                                                        data.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {filteredChildren.map(
                                                                            (
                                                                                student
                                                                            ) => (
                                                                                <CommandItem
                                                                                    key={
                                                                                        student.id
                                                                                    }
                                                                                    value={
                                                                                        student.id.toString() +
                                                                                        "-" +
                                                                                        student.full_name
                                                                                    }
                                                                                    onSelect={(
                                                                                        value
                                                                                    ) => {
                                                                                        const studentId =
                                                                                            value.split(
                                                                                                "-"
                                                                                            )[0];

                                                                                        setValue(
                                                                                            studentId
                                                                                        );
                                                                                        setOpen(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <StudentItem
                                                                                        student={
                                                                                            student
                                                                                        }
                                                                                    />
                                                                                </CommandItem>
                                                                            )
                                                                        )}
                                                                    </CommandGroup>
                                                                    {hasNextPage && (
                                                                        <CommandItem
                                                                            asChild
                                                                            value={
                                                                                "z " +
                                                                                search
                                                                            }
                                                                        >
                                                                            <Button
                                                                                onClick={() =>
                                                                                    fetchNextPage()
                                                                                }
                                                                                disabled={
                                                                                    isFetchingNextPage
                                                                                }
                                                                                className="cursor-pointer w-full flex justify-center items-center text-small p-4 transition-all ease-in-out hover:bg-gray-200 dark:hover:bg-neutral-700"
                                                                            >
                                                                                {isFetchingNextPage
                                                                                    ? "Memuat data..."
                                                                                    : "Lihat Lainnya"}
                                                                            </Button>
                                                                        </CommandItem>
                                                                    )}
                                                                </>
                                                            )}
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </AspectRatio>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Nama
                                    </p>
                                    <p>{selectedProfile?.full_name || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Kategori
                                    </p>
                                    <p>
                                        {selectedProfile?.risk_category
                                            ? capitalizeFirstLetter(
                                                  selectedProfile?.risk_category
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Jenis Kelamin
                                    </p>
                                    <p>
                                        {selectedProfile?.gender
                                            ? capitalizeFirstLetter(
                                                  selectedProfile?.gender
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-small text-gray-400 -mb-1">
                                        Tanggal Lahir
                                    </p>
                                    <p>
                                        {selectedProfile?.date_time_birth
                                            ? formattedDate(
                                                  selectedProfile.date_time_birth.toString()
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                            <DrawerDescription />
                        </DrawerHeader>
                        <DrawerFooter className="pt-2">
                            <Button
                                variant={"default"}
                                onClick={() => connectStudentButton()}
                                disabled={!selectedProfile}
                            >
                                Tambah
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    className="text-medium"
                                >
                                    Batal
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        );
    }
}

const StudentItem = ({ student }: { student?: Child }) => {
    return (
        <div className="w-full flex items-center gap-2 cursor-pointer">
            <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={
                            student?.picture
                                ? getChildrenImage(student.picture)
                                : "/static/images/user-default.jpg"
                        }
                        alt="Child Profile"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="flex flex-col items-start">
                <p>{student?.full_name || "Siswa"}</p>
                <Badge variant={"default"}>
                    {student?.risk_category
                        ? capitalizeFirstLetter(student.risk_category)
                        : "N/A"}
                </Badge>
            </div>
        </div>
    );
};
