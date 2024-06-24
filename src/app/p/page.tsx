import Clock from "@/components/elements/Clock";
import Alert from "@/components/elements/alerts/Alert";
import Pill from "@/components/elements/alerts/Pill";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomeParent({}) {
    return (
        <>
            <section className="mx-auto max-w-7xl mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="h-32 overflow-hidden p-4 rounded-lg bg-gradient-to-b from-purple-200 to-purple-100 sm:h-64">
                    <p className="text-primary -mb-1">Good Morning</p>
                    <p className="text-primary font-semibold tracking-tight text-xl sm:text-3xl">
                        Nama Kamu
                    </p>
                </div>
                <Clock />
            </section>

            <section className="mx-auto max-w-7xl gap-2 bg-white border border-gray-300 rounded-lg p-3 group-[.open]:block sm:flex md:group-[.open]:flex">
                <div className="mb-2 group-[.open]:mb-2 group-[.open]:w-full sm:mb-0 sm:w-7/12 md:group-[.open]:mb-0 md:group-[.open]:w-7/12">
                    <p className="font-semibold tracking-tighter text-large">
                        Today activites
                    </p>
                    <p className="text-gray-500 text-small">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officia corrupti nulla modi cupiditate delectus
                        inventore.
                    </p>
                    <Alert
                        text="Fadli menggunakan asesmen M-Chart-R/F"
                        desc="Asesmen M-Chart-R/F adalah untuk memonitoring anak autisme"
                        icon="info"
                        type="primary"
                        classnew="my-2"
                    />

                    <div className="flex items-center">
                        <Pill
                            text="Rekomendasi 2/6"
                            icon="assignment"
                            type="secondary"
                            classnew="w-fit"
                        />

                        {/* <Link
                            href={"/p/assessment"}
                            className="text-small flex gap-1 items-center hover:underline"
                        >
                            Lihat detil
                            <span className="material-symbols-outlined !leading-none !text-xl hover:no-underline">
                                folder_open
                            </span>
                        </Link> */}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 group-[.open]:grid-cols-2 md:group-[.open]:grid-cols-1">
                        <div className="my-2 flex gap-2 items-center flex-col group-[.open]:flex-col sm:flex-row md:group-[.open]:flex-row">
                            <div className="w-24 bg-gray-300 rounded-lg overflow-hidden">
                                <AspectRatio ratio={1 / 1} className="bg-muted">
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
                                <p className="text-medium font-semibold tracking-tighter">
                                    Lorem ipsum dolor sit amet.
                                </p>
                                <p className="text-small">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit...
                                </p>
                                <div className="badge badge-outline text-small">
                                    Selesai
                                </div>
                            </div>
                        </div>
                        <div className="my-2 flex gap-2 items-center flex-col group-[.open]:flex-col sm:flex-row md:group-[.open]:flex-row">
                            <div className="w-24 bg-gray-300 rounded-lg overflow-hidden">
                                <AspectRatio ratio={1 / 1} className="bg-muted">
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
                                <p className="text-medium font-semibold tracking-tighter">
                                    Lorem ipsum dolor sit amet.
                                </p>
                                <p className="text-small">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit...
                                </p>
                                <div className="badge badge-outline text-small">
                                    Belum dilakukan
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link
                            className={buttonVariants({ variant: "outline" })}
                            href={"/p/childs/1/recomendation"}
                        >
                            Lihat detil{" "}
                            <span className="material-symbols-outlined ms-1 !leading-none !text-xl hover:no-underline">
                                folder_open
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="group-[.open]:w-full sm:w-5/12 md:group-[.open]:w-5/12">
                    <AspectRatio ratio={8 / 9} className="bg-muted">
                        <Image
                            src={"/static/images/default.jpg"}
                            alt="Recomendation Image"
                            fill={true}
                            className="rounded-xl object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </div>
                {/* flex justify-center items-center rounded-lg min-h-44 group-[.open]:w-full sm:w-5/12 md:group-[.open]:w-5/12 */}
            </section>
        </>
    );
}
