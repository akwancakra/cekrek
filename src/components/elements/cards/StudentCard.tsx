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
import Image from "next/image";
import Link from "next/link";

interface StudentCardProps {
    student: Child;
}

export default function StudentCard({ student }: StudentCardProps) {
    const getVariant = () => {
        switch (student.risk_category) {
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

    return (
        <div className="w-full border border-gray-300 p-2 rounded-lg">
            <div className="w-full bg-gray-300 rounded-lg">
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={"/static/images/user-default.jpg"}
                        alt="Student Profile"
                        fill={true}
                        className="rounded-lg"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div>
                <p className="text-medium font-semibold tracking-tight">
                    {student.full_name}
                </p>
                <div className="my-1.5">
                    <p className="text-xs text-gray-500">Terakhir asesmen</p>
                    <p className="text-small text-gray-700">20 Jan 2024</p>
                </div>
                <Badge
                    variant={"outline"}
                    className={`${getVariant()} !text-xs`}
                >
                    {student.risk_category?.toUpperCase() || "N/A"}
                </Badge>
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
                                    href={`/t/students/${student.id}/assessment`}
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
                                <Link
                                    href={`/t/students/${student.id}/recommendation`}
                                >
                                    <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                        clinical_notes
                                    </span>{" "}
                                    Lakukan monitoring
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Link href={`/t/students/${student.id}/edit`}>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
