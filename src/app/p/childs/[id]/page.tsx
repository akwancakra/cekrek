"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Template({}) {
    const removeChildButton = () => {
        console.log("Child Remove Button Clicked!");
    };

    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="flex gap-2 justify-between items-center">
                <Button asChild variant={"outline"} className="mb-3">
                    <Link href={"/p/childs"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                            arrow_back
                        </span>
                        Kembali
                    </Link>
                </Button>
                <div className="flex gap-2 items-center">
                    <Button
                        asChild
                        variant={"outline"}
                        className="mb-3 bg-yellow-300 border-yellow-700 text-yellow-700 hover:bg-yellow-400 hover:text-yellow-700"
                        size={"icon"}
                    >
                        <Link href={"/p/childs/1/edit"}>
                            <span className="material-symbols-outlined !leading-none !text-base hover:no-underline">
                                edit_document
                            </span>
                        </Link>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="mb-3 bg-red-300 border-red-700 text-red-700 hover:bg-red-400 hover:text-red-700"
                                size={"icon"}
                            >
                                <span className="material-symbols-outlined !leading-none !text-base hover:no-underline">
                                    delete
                                </span>
                            </Button>
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
                                    dan tidak bisa dikembalikan, dan berikut
                                    rincian data yang akan dihapus:
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
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => removeChildButton()}
                                        className="bg-red-500 text-white hover:bg-red-700"
                                    >
                                        Hapus
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                    <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={"/static/images/user-default.jpg"}
                                alt="Child Profile"
                                fill={true}
                                className="rounded-lg object-cover"
                                draggable={false}
                            />
                            <div className="absolute bottom-0 w-full">
                                <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                    <Select>
                                        <SelectTrigger
                                            id="framework"
                                            className="h-fit"
                                        >
                                            <SelectValue placeholder="Pilih Anak" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem
                                                value="dwiky"
                                                defaultChecked
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                        <AspectRatio
                                                            ratio={1 / 1}
                                                        >
                                                            <Image
                                                                src={
                                                                    "/static/images/user-default.jpg"
                                                                }
                                                                alt="Child Profile"
                                                                fill={true}
                                                                className="rounded-lg object-cover"
                                                                draggable={
                                                                    false
                                                                }
                                                            />
                                                        </AspectRatio>
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <p>Dwiky Putra</p>
                                                        <Badge
                                                            variant={"default"}
                                                        >
                                                            Badge
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="ahmad">
                                                <div className="flex items-center gap-2">
                                                    <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                        <AspectRatio
                                                            ratio={1 / 1}
                                                        >
                                                            <Image
                                                                src={
                                                                    "/static/images/user-default.jpg"
                                                                }
                                                                alt="Child Profile"
                                                                fill={true}
                                                                className="rounded-lg object-cover"
                                                                draggable={
                                                                    false
                                                                }
                                                            />
                                                        </AspectRatio>
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <p>Ahmad Jalalani</p>
                                                        <Badge
                                                            variant={"default"}
                                                        >
                                                            Badge
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* <div>
                                        <p className="font-semibold text-lg tracking-tight">
                                            Dewantara
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            12 Rekomendasi
                                        </p>
                                    </div>
                                    <button className="btn btn-square">
                                        <span className="material-symbols-outlined">
                                            expand_more
                                        </span>
                                    </button> */}
                                </div>
                            </div>
                        </AspectRatio>
                    </div>
                    <div className="grid grid-cols-4 max-w-xs w-full gap-2 mt-2 lg:max-w-none">
                        <div className="rounded-lg bg-gray-400 w-full">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="rounded-lg bg-gray-400 w-full">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="rounded-lg bg-gray-400 w-full">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="rounded-lg bg-gray-400 w-full">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                    <div className="w-full justify-between items-center sm:flex">
                        <div>
                            <p className="text-gray-400 text-xs">Profile</p>
                            <p className="text-header">Dewantara</p>
                        </div>
                        <Button asChild variant={"default"}>
                            <Link href={"/p/childs/2/recommendations"}>
                                Buat asesmen
                                <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                    assignment
                                </span>
                            </Link>
                        </Button>
                    </div>
                    {/* PROFILE DATA */}
                    <div className="border border-gray-300 p-2 rounded-lg my-3">
                        <div>
                            <p className="font-semibold tracking-tight text-lg">
                                Kategori
                            </p>
                            <div className="divider my-1" />
                            <div className="w-full grid grid-cols-3 gap-2">
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold tracking-tight text-lg">
                                Kategori
                            </p>
                            <div className="divider my-1" />
                            <div className="w-full grid grid-cols-3 gap-2">
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-sm sm:text-base">
                                        Akwan Cakra
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ASESMEN HISTORY */}
                    <div className="border border-gray-300 p-2 rounded-lg my-3">
                        <p className="font-semibold tracking-tight text-lg">
                            Riwayat Asesmen
                        </p>
                        <div className="divider my-1" />
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tipe</th>
                                        <th>Aspek Yang Kurang</th>
                                        <th>Total Rekomendasi</th>
                                        <th>Tanggal Tes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Asesmen Umum</td>
                                        <td>Berbicara, Berinteraksi (2)</td>
                                        <td>9</td>
                                        <td>24 Mar 2024</td>
                                    </tr>
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Asesmen M-Chart-R/F</td>
                                        <td>N/A</td>
                                        <td>12</td>
                                        <td>13 Feb 2024</td>
                                    </tr>
                                    <tr className="hover">
                                        <th>3</th>
                                        <td>Asesmen M-Chart-R/F</td>
                                        <td>N/A</td>
                                        <td>14</td>
                                        <td>1 Jan 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
