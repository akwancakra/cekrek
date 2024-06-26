import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MonitorChildRecommendation } from "@/types/monitorChildRecommendation.type";
import { Recommendation } from "@/types/recommendation.type";
import Image from "next/image";

interface RecommendationIndexCardProps {
    recommendation: Recommendation;
    monitoringChildRec?: MonitorChildRecommendation[];
}

export default function RecommendationIndexCard({
    recommendation,
    monitoringChildRec,
}: RecommendationIndexCardProps) {
    const isDone = () => {
        const found = monitoringChildRec?.some((item) => {
            if (
                item.child_recommendation?.recommendation_id ===
                recommendation.id
            ) {
                return true;
            }
            return false;
        });

        return found || false;
    };

    return (
        <>
            <div className="my-2 flex gap-2 items-center flex-col group-[.open]:flex-col sm:flex-row md:group-[.open]:flex-row">
                <div className="w-24 bg-gray-300 rounded-lg overflow-hidden">
                    <AspectRatio ratio={1 / 1} className="bg-muted">
                        <Image
                            src={`/static/images/${
                                recommendation.icon || "default.jpg"
                            }`}
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
                    <p className="text-small">{recommendation.description}</p>
                    <div className="badge badge-outline text-small">
                        {isDone() === true ? "Selesai" : "Belum dilakukan"}
                    </div>
                </div>
            </div>
        </>
    );
}
