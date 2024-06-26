"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Child } from "@/types/children.types";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import ExcelAssessmentStudent from "@/components/elements/exports/ExcelAssessmentStudent";
import { PDFAssessmentStudent } from "@/components/elements/exports/PDFAssessmentStudent";
import {
    getRiskCategory,
    getScoreAssessments,
    processChildAssessments,
} from "@/utils/converters";
import { childs } from "@/utils/tempData";

export default function Template({}) {
    const [profile, setProfile] = useState<Child>(childs[0]);
    const [selectedChildId, setSelectedChildId] = useState(`${profile.id}`);
    const historyAssessmen = processChildAssessments(profile);

    const handleChange = (value: any) => {
        setSelectedChildId(value);
        setProfile(childs.find((child) => child.id == value) as Child);
    };

    const getVariant = (risk_category: string) => {
        switch (risk_category) {
            case "rendah":
                return "border-yellow-700 text-yellow-700 bg-yellow-100";
            case "sedang":
                return "border-primary text-primary bg-purple-100";
            case "tinggi":
                return "border-red-700 text-red-700 bg-red-100";
            default:
                return "";
        }
    };

    const removeChildButton = (id: number) => {
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
            </div>
            <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                    <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={`/static/images/${
                                    profile.picture || "user-default.jpg"
                                }`}
                                alt="Child Profile"
                                fill={true}
                                className="rounded-lg object-cover"
                                draggable={false}
                            />
                            <div className="absolute bottom-0 w-full">
                                <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                    <Select
                                        value={selectedChildId}
                                        onValueChange={handleChange}
                                    >
                                        <SelectTrigger
                                            id="framework"
                                            className="h-fit"
                                        >
                                            <SelectValue placeholder="Pilih Anak" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {childs.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={`${item.id}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                                            <AspectRatio
                                                                ratio={1 / 1}
                                                            >
                                                                <Image
                                                                    src={`/static/images/${
                                                                        item.picture ||
                                                                        "user-default.jpg"
                                                                    }`}
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
                                                            <p>
                                                                {item.full_name}
                                                            </p>
                                                            <Badge
                                                                variant={
                                                                    "outline"
                                                                }
                                                                className={`${getVariant(
                                                                    item.risk_category ||
                                                                        "Low"
                                                                )}`}
                                                            >
                                                                {item.risk_category?.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </AspectRatio>
                    </div>
                </div>
                <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                    <div className="w-full justify-between items-center sm:flex">
                        <div>
                            <p className="text-gray-400 text-xs">Profile</p>
                            <p className="text-header">{profile.full_name}</p>
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
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/p/childs/${profile.id}/assessment`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                assignment
                                            </span>{" "}
                                            Lakukan monitoring
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/p/childs/${profile.id}/recommendation`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                clinical_notes
                                            </span>{" "}
                                            Rekomendasi harian
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={`/p/childs/${profile.id}/edit`}
                                        >
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                edit
                                            </span>{" "}
                                            Ubah anak
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
                                                    <span>Hapus anak</span>
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
                                                        dan tidak bisa
                                                        dikembalikan, dan
                                                        berikut rincian data
                                                        yang akan dihapus:
                                                        <span className="block mt-1">
                                                            &gt; Data profil
                                                            anak
                                                        </span>
                                                        <span className="block">
                                                            &gt; Data riwayat
                                                            asesmen
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
                                                    <AlertDialogAction asChild>
                                                        <Button
                                                            variant={
                                                                "destructive"
                                                            }
                                                            onClick={() =>
                                                                removeChildButton(
                                                                    profile.id
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
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                                        {profile.full_name}
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
                            <Table>
                                {/* <TableCaption>
                                    A list of your recent invoices.
                                </TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        {/* <TableHead>ID</TableHead> */}
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Lulus/Gagal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Tanggal Tes</TableHead>
                                        <TableHead className="w-2 text-center">
                                            #
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {historyAssessmen?.length == 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                Belum memiliki riwayat asesmen
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {historyAssessmen?.map((ass, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                Asesmen{" "}
                                                {capitalizeFirstLetter(
                                                    ass.type
                                                )}
                                            </TableCell>
                                            <TableCell>{ass.score}</TableCell>
                                            <TableCell>
                                                {ass.risk_category}
                                            </TableCell>
                                            <TableCell>
                                                {formattedDate(
                                                    ass.date_time.toString()
                                                )}
                                            </TableCell>
                                            <TableCell className="w-2 text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none opacity-70">
                                                                more_horiz
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Aksi
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger>
                                                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                                        assignment
                                                                    </span>{" "}
                                                                    <span>
                                                                        Unduh
                                                                        asesmen
                                                                    </span>
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuPortal>
                                                                    <DropdownMenuSubContent>
                                                                        <ExcelAssessmentStudent
                                                                            data={
                                                                                profile
                                                                            }
                                                                        />
                                                                        <PDFAssessmentStudent
                                                                            data={
                                                                                profile
                                                                            }
                                                                        />
                                                                    </DropdownMenuSubContent>
                                                                </DropdownMenuPortal>
                                                            </DropdownMenuSub>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2}>Total</TableCell>
                                        <TableCell
                                            colSpan={2}
                                            className="text-right"
                                        >
                                            {profile?.child_assesments?.length}{" "}
                                            Assesmen Total
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
