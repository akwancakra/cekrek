import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Recommendation } from "@/types/recommendation.type";
import { getRecommendationImageUrl } from "@/utils/converters";
import Image from "next/image";

type ChildRecommendation = {
    id: number;
    children_id: number;
    recommendation_id: number;
    recommendations?: Recommendation;
};

interface Props {
    index: number;
    recommendation: ChildRecommendation;
    handleSave: (answer: { answer: string }, index: number) => void;
    // handleNext: (index: number, answer: string) => void;
    // handleBack: (index: number, answer: string) => void;
}

export default function AssessmentChoicePass({
    index,
    recommendation,
    handleSave,
}: // handleNext,
// handleBack,
Props) {
    return (
        <>
            <div className="max-w-lg bg-gray-400 rounded-lg w-full">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={getRecommendationImageUrl({
                            image: recommendation?.recommendations?.icon,
                        })}
                        alt="Recomendation Image"
                        fill={true}
                        className="rounded-lg object-scale-down"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <p className="text-center text-medium">
                {recommendation?.recommendations?.title || "N/A"}
            </p>
            <div
                dangerouslySetInnerHTML={{
                    __html: recommendation?.recommendations?.description ?? "",
                }}
                className="text-gray-500 text-small dark:text-neutral-300"
            />
            {/* <p className="text-gray-500 text-center text-small">
                {recommendation?.recommendations?.description}
            </p> */}
            <div className="w-full max-w-lg">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                        variant={"outline"}
                        onClick={() => handleSave({ answer: "ya" }, index)}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Ya/Sudah
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => handleSave({ answer: "tidak" }, index)}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak/Belum
                    </Button>
                </div>
            </div>
        </>
    );
}
