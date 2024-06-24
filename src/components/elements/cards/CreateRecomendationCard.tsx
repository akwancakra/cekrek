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
import Image from "next/image";

export default function CreateRecomendationCard() {
    return (
        <div className="rounded-lg border border-gray-300 p-2 flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
                <div className="bg-gray-400 rounded-lg w-14 hidden sm:block sm:w-24">
                    <AspectRatio ratio={1 / 1}>
                        <Image
                            src={"/static/images/default.jpg"}
                            alt="Recomendation Image"
                            fill={true}
                            className="rounded-lg object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </div>
                <div>
                    <p className="font-semibold tracking-tight text-medium">
                        Diajak berbicara selama 1 menit
                    </p>
                    <p className="text-gray-500 -mt-1 text-small">
                        Lakukan sesi pembelajaran berbicara selama 1 menit
                    </p>
                </div>
            </div>
            <div className="items-center gap-2 hidden sm:flex group-[.open]:hidden md:group-[.open]:flex">
                <Button variant={"outline"}>
                    <span>Detil</span>
                </Button>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        close
                    </span>
                </Button>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className="inline-flex sm:hidden group-[.open]:inline-flex md:group-[.open]:hidden"
                >
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
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                assignment
                            </span>{" "}
                            Lihat detil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer bg-red-100 text-red-500 hover:!bg-red-200 hover:!text-red-600">
                            <span className="material-symbols-outlined cursor-pointer me-1 !text-xl !leading-4 opacity-70">
                                close
                            </span>{" "}
                            Hapus rekomendasi
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
