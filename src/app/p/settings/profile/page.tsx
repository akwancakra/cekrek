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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user.types";
import { fetcher } from "@/utils/fetcher";
import { formattedDate } from "@/utils/formattedDate";
import useProfile from "@/utils/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function ParentProfilePage() {
    const profile = useProfile();
    const [parentData, setParentData] = useState<User>(null);

    const { push } = useRouter();

    const {
        data,
        isLoading,
    }: { data: { status: string; parent: User }; isLoading: boolean } = useSWR(
        `/api/parents/${profile?.id}`,
        fetcher
    );

    useEffect(() => {
        if (!isLoading && data?.parent) {
            setParentData(data.parent);
        }
    }, [data, isLoading]);

    return (
        <>
            <section className="mx-auto max-w-7xl mb-4">
                <div className="flex gap-2 justify-between items-center">
                    <Button asChild variant={"outline"} className="mb-3">
                        <Link href={"/p/settings"}>
                            <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                                arrow_back
                            </span>
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                    <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                        <div className="relative rounded-lg border border-gray-300 bg-gray-400 max-w-xs w-full lg:max-w-none">
                            <AspectRatio ratio={3 / 4}>
                                <Image
                                    src={"/static/images/parent.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                        <div className="w-full justify-between items-center sm:flex">
                            <div>
                                <p className="text-gray-400 text-xs">Profil</p>
                                <p className="text-header">
                                    {parentData?.name}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="gap-1">
                                    <Button variant="outline">
                                        <span>Menu</span>{" "}
                                        <span className="material-symbols-outlined cursor-pointer filled !text-xl !leading-4 opacity-70">
                                            more_horiz
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            asChild
                                        >
                                            <Link
                                                href={`/p/settings/profile/edit`}
                                            >
                                                <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                    edit
                                                </span>{" "}
                                                Ubah akun
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
                                                        <span>Hapus akun</span>
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah kamu yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Ini akan menghapus
                                                            data{" "}
                                                            <span className="font-semibold">
                                                                {
                                                                    parentData?.name
                                                                }
                                                            </span>{" "}
                                                            dan tidak bisa
                                                            dikembalikan, dan
                                                            berikut rincian data
                                                            yang akan dihapus:
                                                            <span className="block mt-1">
                                                                &gt; Data profil
                                                                anak
                                                            </span>
                                                            <span className="block">
                                                                &gt; Data
                                                                riwayat asesmen
                                                            </span>
                                                            <span className="block">
                                                                &gt; Data
                                                                rekomendasi
                                                            </span>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            asChild
                                                        >
                                                            <Button
                                                                variant={
                                                                    "destructive"
                                                                }
                                                                onClick={() => {
                                                                    toast.success(
                                                                        "Akun berhasil dihapus"
                                                                    );
                                                                    push("/");
                                                                }}
                                                                className="bg-red-500 text-white hover:bg-red-700"
                                                            >
                                                                Hapus
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="border border-gray-300 p-2 rounded-lg my-3">
                            <div>
                                <p className="font-semibold tracking-tight text-lg">
                                    Biodata
                                </p>
                                <div className="divider my-1" />
                                <div className="w-full grid grid-cols-3 gap-2">
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Nama
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.name}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            E-mail
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.email}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Pendidikan
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.education || "-"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Pekerjaan
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.job || "-"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Agama
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.religion || "-"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            No. Telp
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.phone || "-"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Tempat Lahir
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.phone || "-"}
                                        </p>
                                    </div>
                                    <div className="my-1">
                                        <p className="text-xs to-gray-400">
                                            Tanggal Lahir
                                        </p>
                                        <p className="text-medium font-semibold">
                                            {parentData?.date_time_birth
                                                ? formattedDate(
                                                      parentData.date_time_birth.toString()
                                                  )
                                                : "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
