import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ChildCard({}) {
    return (
        <div className="border border-gray-300 rounded-lg p-2 md:min-w-48">
            <div className="bg-gray-400 w-full rounded-lg overflow-hidden">
                <AspectRatio ratio={4 / 3} className="bg-muted">
                    <Image
                        src={"/static/images/user-default.jpg"}
                        alt="Child Profile"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="text-center mt-3">
                <p className="font-semibold tracking-tighter -mb-1 text-large">
                    Putra Adam
                </p>
                <Badge variant="outline" className="bg-primary text-white">
                    Kondisi Menengah
                </Badge>
                <div className="grid gap-2 grid-cols-1 group-[.open]:grid-cols-1 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                    <Button asChild variant={"outline"} className="text-small">
                        <Link className="w-full mt-2" href={"/p/childs/2"}>
                            <span className="hidden me-1 group-[.open]:hidden md:block lg:group-[.open]:block">
                                Lihat
                            </span>
                            Detil{" "}
                            <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                id_card
                            </span>
                        </Link>
                    </Button>
                    <Button asChild variant={"outline"} className="text-small">
                        <Link
                            className="w-full group-[.open]:mt-0 sm:mt-2 md:group-[.open]:mt-2"
                            href={"/p/childs/2/recommendation"}
                        >
                            <span className="hidden me-1 group-[.open]:hidden md:block lg:group-[.open]:block">
                                Lihat
                            </span>
                            Rekomendasi{" "}
                            <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                folder_open
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
