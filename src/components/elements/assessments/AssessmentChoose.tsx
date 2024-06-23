import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

export default function AssessmentChoose() {
    return (
        <section className="mx-auto flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
            <section className="mx-auto max-w-7xl w-full mb-4 h-full">
                <div className="mx-auto max-w-3xl rounded-lg border border-gray-300 p-2 flex justify-between items-center gap-4">
                    <div className="gap-4 sm:flex">
                        <div className="bg-gray-400 w-24 rounded-lg">
                            <AspectRatio ratio={1 / 1}>
                                <p>IMG</p>
                            </AspectRatio>
                        </div>
                        <div>
                            <div className="mb-3">
                                <p className="text-gray-400 text-small -mb-1">
                                    Nama
                                </p>
                                <p className="text-large font-semibold tracking-tight">
                                    Akwan Cakra
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-medium">
                                        Akwan Cakra
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-small -mb-1">
                                        Nama
                                    </p>
                                    <p className="font-medium tracking-tight text-medium">
                                        Akwan Cakra
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button variant={"outline"} size={"icon"} asChild>
                        <Link href={"/t/students/1"}>
                            <span className="material-symbols-outlined !leading-none !text-2xl">
                                chevron_right
                            </span>
                        </Link>
                    </Button>
                </div>
                <div className="max-w-3xl mx-auto h-full mt-3 grid grid-cols-2 gap-2">
                    <div className="h-full border border-gray-300 rounded-lg p-2 md:min-w-80 group-[.open]:min-w-fit lg:group-[.open]:min-w-80">
                        <div className="bg-gray-400 w-full rounded-lg">
                            <AspectRatio ratio={4 / 5}>
                                <Image
                                    src={"/static/images/default.jpg"}
                                    alt="Recomendation Image"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="flex flex-col justify-between h-fit text-center mt-3">
                            <div>
                                <p className="font-semibold tracking-tight -mb-1 text-large">
                                    Asesmen Umum
                                </p>
                                <p className="text-gray-400 text-small">
                                    General assessment adalah bla bla bla...
                                </p>
                            </div>
                            <Button
                                variant={"outline"}
                                disabled={true}
                                className="gap-1 w-full mt-2"
                            >
                                <span>Segera Hadir</span>
                                <span className="material-symbols-outlined !text-xl !leading-4">
                                    assignment
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="h-full border border-gray-300 rounded-lg p-2 md:min-w-80 group-[.open]:min-w-fit lg:group-[.open]:min-w-80">
                        <div className="bg-gray-400 w-full rounded-lg">
                            <AspectRatio ratio={4 / 5}>
                                <Image
                                    src={"/static/images/default.jpg"}
                                    alt="Recomendation Image"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="text-center mt-3">
                            <p className="font-semibold tracking-tight -mb-1 text-large">
                                Asesmen M-Chart-R/F
                            </p>
                            <p className="text-gray-400 text-small">
                                General assessment adalah bla bla bla...
                            </p>
                            <Button
                                variant={"outline"}
                                className="gap-1 w-full mt-2"
                            >
                                <span>Buat asesmen</span>
                                <span className="material-symbols-outlined !text-xl !leading-4">
                                    assignment
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
