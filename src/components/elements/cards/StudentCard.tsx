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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Child } from "@/types/children.types";
import { getVariant, truncateString } from "@/utils/converters";
import { getChildrenImage } from "@/utils/fetcher";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

interface StudentCardProps {
    student: Child;
    removeStudent: (id: string) => void;
}

const AlertDialogTriggerForwarded = forwardRef<
    HTMLButtonElement,
    { children?: React.ReactNode }
>(function AlertDialogTriggerForwarded(props, ref) {
    return (
        <AlertDialogTrigger asChild>
            <button ref={ref} {...props}>
                {props.children}
            </button>
        </AlertDialogTrigger>
    );
});

const AlertDialogActionForwarded = forwardRef<
    HTMLButtonElement,
    { children?: React.ReactNode }
>(function AlertDialogActionForwarded(props, ref) {
    return (
        <AlertDialogAction asChild>
            <Button ref={ref} {...props}>
                {props.children}
            </Button>
        </AlertDialogAction>
    );
});

export default function StudentCard({
    student,
    removeStudent,
}: StudentCardProps) {
    return (
        <div className="w-full flex flex-col gap-2 border border-gray-300 p-2 rounded-lg dark:border-neutral-600">
            <div className="w-full h-1/2 bg-gray-300 rounded-lg overflow-hidden">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={
                            student?.picture
                                ? getChildrenImage(student.picture)
                                : "/static/images/user-default.jpg"
                        }
                        alt="Student Profile"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="grow h-1/2 flex flex-col justify-between">
                <div>
                    <p className="text-medium font-semibold tracking-tight">
                        {truncateString(student?.full_name || "N/A", 15)}
                    </p>
                    <div className="my-1.5">
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                            Terakhir asesmen
                        </p>
                        <p className="text-small text-gray-700 dark:text-neutral-200">
                            {student?.last_assesment
                                ? formattedDate(student.last_assesment)
                                : "N/A"}
                        </p>
                    </div>
                    <Badge
                        variant={"outline"}
                        className={`${
                            student?.risk_category
                                ? getVariant(student.risk_category)
                                : ""
                        } !text-xs`}
                    >
                        {student?.risk_category
                            ? capitalizeFirstLetter(student.risk_category)
                            : "N/A"}
                    </Badge>
                </div>
                <div className="flex gap-1 mt-2">
                    <Button variant="outline" className="grow" asChild>
                        <Link href={`/t/students/${student.id}`}>Detil</Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size={"icon"}
                                className="min-w-max"
                            >
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-4 opacity-70">
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
                                <Link href={`/t/students/${student.id}`}>
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        contacts
                                    </span>{" "}
                                    Lihat detil
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href={`/t/students/${student?.id}/recommendation`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        prescriptions
                                    </span>{" "}
                                    Lakukan monitoring
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href={`/t/students/${student?.id}/assessment`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        assignment
                                    </span>{" "}
                                    Lakukan asesmen
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href={`/t/students/${student?.id}/edit`}>
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
                                            className="w-full text-sm py-1.5 rounded-md px-2 gap-1 flex justify-start items-center cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600 dark:bg-red-600 dark:text-red-100 dark:hover:!bg-red-700 dark:hover:!text-red-200"
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
                                            {/* <AlertDialogActionForwarded>
                                                <Button
                                                    variant={"destructive"}
                                                    onClick={() =>
                                                        removeStudent(
                                                            student.id.toString()
                                                        )
                                                    }
                                                    className="bg-red-500 text-white hover:bg-red-700"
                                                >
                                                    Hapus siswa
                                                </Button>
                                            </AlertDialogActionForwarded> */}
                                            <AlertDialogAction
                                                onClick={() =>
                                                    removeStudent(
                                                        student.id.toString()
                                                    )
                                                }
                                                asChild
                                            >
                                                <Button
                                                    variant={"destructive"}
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
                </div>
            </div>
        </div>
    );
}
