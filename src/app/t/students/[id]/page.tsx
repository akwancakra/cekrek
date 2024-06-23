"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Assessment } from "@/types/assessment.types";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { PDFAssessmentStudent } from "@/components/elements/exports/PDFAssessmentStudent";
import ExcelAssessmentStudent from "@/components/elements/exports/ExcelAssessmentStudent";

const assessments: Assessment[] = [
    {
        id: "1",
        title: "Assessment 1",
        description: "Assessment 1 Description",
        category: "Low",
        createdAt: "2022-01-01",
    },
    {
        id: "2",
        title: "Assessment 2",
        description: "Assessment 2 Description",
        category: "Medium",
        createdAt: "2022-02-01",
    },
    {
        id: "3",
        title: "Assessment 3",
        description: "Assessment 3 Description",
        category: "Low",
        createdAt: "2022-03-01",
    },
];

export default function StudentDetails({}) {
    return (
        <section className="mx-auto max-w-7xl mb-4">
            <div className="flex gap-2 justify-between items-center">
                <Button asChild variant={"outline"} className="mb-3">
                    <Link href={"/t"}>
                        <span className="material-symbols-outlined me-1 !leading-none !text-lg hover:no-underline">
                            arrow_back
                        </span>
                        Kembali
                    </Link>
                </Button>
                {/* <div className="flex gap-2 items-center">
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
                </div> */}
            </div>
            <div className="block gap-4 group-[.open]:block lg:group-[.open]:flex md:flex">
                <div className="flex flex-col items-center w-full group-[.open]:w-full lg:group-[.open]:w-1/3 md:w-1/3">
                    <div className="relative rounded-lg bg-gray-400 max-w-xs w-full lg:max-w-none">
                        <AspectRatio ratio={3 / 4}>
                            <Image
                                src={"/static/images/user-default.jpg"}
                                alt="Recomendation Image"
                                fill={true}
                                className="rounded-lg object-cover"
                                draggable={false}
                            />
                            {/* <div className="absolute bottom-0 w-full">
                                <div className="m-2 flex justify-between items-center bg-white rounded-lg p-2 min-h-20">
                                    <div className="flex items-center gap-2">
                                        <div className="min-w-16 max-w-20 bg-gray-300 rounded-lg ">
                                            <AspectRatio ratio={1 / 1}>
                                                <p>IMG</p>
                                            </AspectRatio>
                                        </div>
                                        <div className="flex flex-col items-start text-medium">
                                            <p>Nama Siswa</p>
                                            <Badge variant={"default"}>
                                                Badge
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </AspectRatio>
                    </div>
                    <div className="grid grid-cols-4 max-w-xs w-full gap-2 mt-2 lg:max-w-none">
                        <div className="rounded-lg bg-gray-400 w-full">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={"/static/images/user-default.jpg"}
                                    alt="Recomendation Image"
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
                                    alt="Recomendation Image"
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
                                    alt="Recomendation Image"
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
                                    alt="Recomendation Image"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3 group-[.open]:w-full group-[.open]:mt-3 lg:group-[.open]:w-2/3 lg:group-[.open]:mt-0 md:w-2/3 md:mt-0">
                    <div className="w-full justify-between items-center flex">
                        <div>
                            <p className="text-gray-400 text-xs">Profile</p>
                            <div className="flex gap-2">
                                <p className="text-header">Dewantara</p>
                                <Badge variant={"default"}>Badge</Badge>
                            </div>
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
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href={"/t/students/1/assessment"}>
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
                                        <Link href={"/t/students/1/assessment"}>
                                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                                assignment
                                            </span>{" "}
                                            Buat asesmen
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link
                                            href={
                                                "/t/students/1/recommendation"
                                            }
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
                                        <Link href={"/t/students/1/edit"}>
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
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <Button
                            asChild
                            variant={"default"}
                            className="mt-2 sm:mt-0"
                        >
                            <Link href={"/t/students/1/assessment"}>
                                Buat asesmen
                                <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                    assignment
                                </span>
                            </Link>
                        </Button> */}
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
                            <Table>
                                {/* <TableCaption>
                                    A list of your recent invoices.
                                </TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Tanggal Tes</TableHead>
                                        <TableHead>#</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assessments.map((assessment) => (
                                        <TableRow key={assessment.id}>
                                            <TableCell className="font-medium">
                                                {assessment.id}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.title}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.description}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.category}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.createdAt}
                                            </TableCell>
                                            <TableCell>
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
                                                                            assessment={
                                                                                assessment
                                                                            }
                                                                        />
                                                                        <PDFAssessmentStudent
                                                                            assessment={
                                                                                assessment
                                                                            }
                                                                        />
                                                                        {/* <DropdownMenuItem className="cursor-pointer gap-1">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="18"
                                                                                height="18"
                                                                                className="fill-green-500"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64" />
                                                                            </svg>
                                                                            <span>
                                                                                Unduh
                                                                                excel
                                                                            </span>
                                                                        </DropdownMenuItem> */}
                                                                        {/* <DropdownMenuItem > */}
                                                                        {/* <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="18"
                                                                                height="18"
                                                                                className="fill-red-700"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
                                                                                />
                                                                            </svg>
                                                                            <span>
                                                                                Unduh
                                                                                pdf
                                                                            </span> */}
                                                                        {/* </DropdownMenuItem> */}
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
                                        <TableCell colSpan={5}>Total</TableCell>
                                        <TableCell className="text-right">
                                            3 Asesmen
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            {/* <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tipe</th>
                                        <th>Aspek Yang Kurang</th>
                                        <th>Total Rekomendasi</th>
                                        <th>Tanggal Tes</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Asesmen Umum</td>
                                        <td>Berbicara, Berinteraksi (2)</td>
                                        <td>9</td>
                                        <td>24 Mar 2024</td>
                                        <td></td>
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
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
