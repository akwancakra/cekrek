import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { MonitorChildRecommendation } from "@/types/monitorChildRecommendation.type";
import { Recommendation } from "@/types/recommendation.type";
import { truncateString } from "@/utils/converters";
import Image from "next/image";

interface RecommendationIndexCardProps {
    recommendation: Recommendation;
    isFinished?: boolean;
}

export default function RecommendationIndexCard({
    recommendation,
    isFinished = false,
}: RecommendationIndexCardProps) {
    return (
        <>
            <div className="my-2 flex gap-2 items-center flex-col group-[.open]:flex-col sm:flex-row md:group-[.open]:flex-row">
                <div className="w-24 bg-gray-300 rounded-lg overflow-hidden">
                    <AspectRatio ratio={1 / 1} className="bg-muted">
                        <Image
                            src={`/static/images/${
                                recommendation.icon || "default.jpg"
                            }`}
                            // src={"/static/images/recommendation.png"}
                            alt="Recomendation Image"
                            fill={true}
                            className="rounded-lg object-cover"
                            draggable={false}
                        />
                    </AspectRatio>
                </div>
                <div>
                    <p className="text-medium font-semibold tracking-tight">
                        {recommendation.title}
                    </p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                truncateString(
                                    recommendation?.description,
                                    80
                                ) ?? "",
                        }}
                        className="text-small"
                    />
                    {/* <p className="text-small">{recommendation.description}</p> */}
                    <Badge variant="outline">
                        {isFinished ? "Selesai" : "Belum dilakukan"}
                    </Badge>
                </div>
            </div>
        </>
    );
}
