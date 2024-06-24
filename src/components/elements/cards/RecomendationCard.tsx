import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function RecomendationCard({}) {
    return (
        <div className="collapse rounded-lg hover:bg-gray-100">
            <input type="checkbox" />
            <div className="collapse-title p-0 min-h-fit">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-300 rounded-lg w-11 overflow-hidden sm:w-16">
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
                            <p className="font-medium text-medium">
                                Judul rekomendasi
                            </p>
                            <p className="text-gray-500 text-small">
                                Tipe: Durasi 30 Detik
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant={"outline"}
                        className="border-primary text-primary"
                    >
                        Telah dilakukan
                    </Badge>
                    {/* <label className="cursor-pointer px-4 z-10">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm !rounded-lg"
                        />
                    </label> */}
                </div>
            </div>
            <div className="collapse-content !p-0">
                <p className="font-semibold text-small">Deskripsi</p>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta consectetur dignissimos magnam esse provident corporis
                    quidem quod nobis, tempore vero iusto facilis, iste
                    temporibus aliquam veritatis. Error recusandae dicta nisi
                    temporibus voluptates praesentium tempore dolore nam?
                    Eveniet laborum hic at animi enim et sint veritatis, minima
                    cum asperiores, quaerat eius!
                </p>
            </div>
        </div>
    );
}
