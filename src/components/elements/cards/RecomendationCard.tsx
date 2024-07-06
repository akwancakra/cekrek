import { Badge } from "@/components/ui/badge";
import { Recommendation } from "@/types/recommendation.type";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface RecomendationCardProps {
    className?: string;
    isActive?: boolean;
    isDone?: boolean;
    recommendation: Recommendation;
}

export default function RecomendationCard({
    className,
    isActive = true,
    isDone = false,
    recommendation,
}: RecomendationCardProps) {
    if (!recommendation) {
        return null;
    }

    return (
        <div
            className={`collapse rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${className}`}
        >
            <input type="checkbox" />
            <div className="collapse-title p-0 min-h-fit">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-300 rounded-lg hidden overflow-hidden sm:block sm:w-16">
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
                                {recommendation?.title || "N/A"}
                            </p>
                            <p className="text-gray-500 text-small dark:text-gray-400">
                                Frekuensi: {recommendation?.frequency || "N/A"}
                            </p>
                        </div>
                    </div>
                    {isActive && (
                        <Badge
                            variant={"outline"}
                            className={`${
                                isDone
                                    ? "border-primary text-primary"
                                    : "border-error text-error"
                            }`}
                        >
                            {isDone ? "Selesai" : "Belum"}
                        </Badge>
                    )}
                </div>
            </div>
            <div className="collapse-content !p-0">
                <div className="bg-gray-300 rounded-lg overflow-hidden block w-32 sm:hidden sm:w-16">
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
                <p className="font-semibold text-small">Deskripsi</p>
                {/* <p className="text-sm">
                    {recommendation?.description || "Tidak ada deskripsi"}
                </p> */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: recommendation?.description ?? "",
                    }}
                    className="text-small"
                />
            </div>
        </div>
    );
}
