import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export default function StudentCard() {
    const [position, setPosition] = useState("bottom");

    return (
        <div className="w-full border border-gray-300 p-2 rounded-lg">
            <div className="w-full bg-gray-300 rounded-lg">
                <AspectRatio ratio={1 / 1}>
                    <p>IMG</p>
                </AspectRatio>
            </div>
            <div>
                <p className="text-medium font-semibold tracking-tight">
                    Nama Siswa
                </p>
                <p className="text-small text-gray-500">Deskripsi singkat</p>
                <Badge variant={"default"}>Sedang</Badge>
                <div className="flex gap-1 mt-2">
                    <Button variant="outline" className="grow" asChild>
                        <Link href={"/t/students/1"}>Detil</Link>
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
                        <DropdownMenuContent className="w-56">
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
                                        Buat asesmen
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    asChild
                                >
                                    <Link href={"/t/students/1/recommendation"}>
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
                </div>
            </div>
        </div>
    );
}
