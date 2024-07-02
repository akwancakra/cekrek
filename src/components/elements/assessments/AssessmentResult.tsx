import Pill from "../alerts/Pill";
import { Button } from "@/components/ui/button";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { Child } from "@/types/children.types";
import { Badge } from "@/components/ui/badge";
import { getRiskCategory, getVariant } from "@/utils/converters";
import { capitalizeFirstLetter } from "@/utils/formattedDate";

interface AssessmentResultProps {
    child: Child;
    assessmentAnswer: AssessmentAnswer[];
    handleNextStage: () => void;
    handleBackStage: () => void;
    isLoading?: boolean;
    // removeAssessmentAnswer: () => void;
}

export default function AssessmentResult({
    child,
    assessmentAnswer,
    handleNextStage,
    handleBackStage,
    isLoading,
}: // removeAssessmentAnswer,
AssessmentResultProps) {
    const getTotalChildAssessment = ({
        childAssessment,
        type,
        answer,
    }: {
        childAssessment: AssessmentAnswer[];
        type?: "awal" | "follow up";
        answer?: "lulus" | "gagal" | "ya" | "tidak";
    }) => {
        return childAssessment.filter(
            (chass) => chass.assesment_type === type && chass.answer === answer
        ).length;
    };

    const childAssessmentIsExist = ({
        childAssessment,
        type,
    }: {
        childAssessment: AssessmentAnswer[];
        type?: "awal" | "follow up";
    }): boolean => {
        const isExist = childAssessment.some(
            (chass) => chass.assesment_type === type
        );
        return isExist;
    };

    return (
        <section className="mx-auto max-w-7xl flex flex-col justify-center items-center w-full h-full gap-2 p-2">
            <div className="w-full border border-gray-300 rounded-lg p-2">
                <div>
                    <p className="text-gray-400 text-xs">
                        Hasil Akhir Asesmen Umum
                    </p>
                    <p className="text-large font-semibold tracking-tight">
                        {child?.full_name || "N/A"}
                    </p>
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 overflow-hidden">
                <div className="bg-purple-100 w-full p-3">
                    <p className="text-large font-semibold tracking-tight">
                        Screening Awal
                    </p>
                </div>
                <div className="p-3">
                    <div className="flex justify-between gap-2 mb-3">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Asesmen Awal
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                {"Skor: " +
                                    getTotalChildAssessment({
                                        childAssessment: assessmentAnswer || [],
                                        type: "awal",
                                        answer: "ya",
                                    }) +
                                    " Ya, " +
                                    getTotalChildAssessment({
                                        childAssessment: assessmentAnswer || [],
                                        type: "awal",
                                        answer: "tidak",
                                    }) +
                                    " Tidak"}
                            </p>
                        </div>
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-full"
                            disabled={isLoading}
                        >
                            <span className="material-symbols-outlined !text-xl !leading-4">
                                info
                            </span>
                        </Button>
                    </div>
                    {/* <div className="flex justify-between gap-2">
                        <div>
                            <p className="font-medium tracking-tight text-medium">
                                Asesmen Follow Up
                            </p>
                            <p className="text-gray-400 text-small -mb-1">
                                {"Skor: " +
                                    getTotalChildAssessment({
                                        childAssessment: assessmentAnswer || [],
                                        type: "follow up",
                                        answer: "lulus",
                                    }) +
                                    " Lulus, " +
                                    getTotalChildAssessment({
                                        childAssessment: assessmentAnswer || [],
                                        type: "follow up",
                                        answer: "gagal",
                                    }) +
                                    " Gagal"}
                            </p>
                        </div>
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-full"
                        >
                            <span className="material-symbols-outlined !text-xl !leading-4">
                                info
                            </span>
                        </Button>
                    </div> */}
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 overflow-hidden">
                <div className="bg-purple-100 w-full p-3">
                    <p className="text-large font-semibold tracking-tight">
                        Skoring Soal
                    </p>
                </div>
                <div className="p-3">
                    {!childAssessmentIsExist({
                        childAssessment: assessmentAnswer || [],
                        type: "awal",
                    }) && (
                        <div>
                            <p className="text-center text-small">
                                Belum ada data asesmen follow up
                            </p>
                        </div>
                    )}
                    {ScoreChildAssessmentCard({
                        childAssessments: assessmentAnswer || [],
                        type: "awal",
                    })}
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 overflow-hidden">
                <div className="bg-purple-100 w-full p-3">
                    <p className="text-large font-semibold tracking-tight">
                        Hasil
                    </p>

                    <Badge
                        variant={"default"}
                        className={`${getVariant(
                            getRiskCategory({
                                childAssesment: assessmentAnswer,
                                type: "awal",
                            })
                        )}`}
                    >
                        Kategori{" "}
                        {getRiskCategory({
                            childAssesment: assessmentAnswer,
                            type: "awal",
                        })}
                    </Badge>
                </div>
            </div>
            <div className="flex gap-3 w-full mb-3 justify-between sm:justify-end">
                <Button
                    variant={"outline"}
                    className="gap-1"
                    onClick={handleBackStage}
                    disabled={isLoading}
                >
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        chevron_left
                    </span>
                    <span>Kembali</span>
                </Button>
                <Button
                    variant={"outline"}
                    className="gap-1"
                    onClick={handleNextStage}
                    disabled={isLoading}
                >
                    <span>Dapatkan Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        check
                    </span>
                </Button>
            </div>
        </section>
    );
}

const ScoreChildAssessmentCard = ({
    childAssessments,
    type,
}: {
    childAssessments: AssessmentAnswer[];
    type: "awal" | "follow up";
}) => {
    const filteredAssessments: AssessmentAnswer[] = childAssessments.filter(
        (chass) => chass.assesment_type === type
    );

    return (
        <>
            {filteredAssessments.map((chass) => (
                <div
                    key={chass.assesment_id}
                    className="flex justify-between items-center gap-2 mb-3"
                >
                    <div>
                        <p className="font-medium tracking-tight text-medium">
                            Soal {chass.assesment?.id || 0}
                        </p>
                        <p className="text-gray-400 text-small -mb-1">
                            {chass.assesment?.question || "Pertanyaan"}
                        </p>
                    </div>
                    <Pill
                        type={
                            chass.answer === "ya" || chass.answer == "lulus"
                                ? "primary"
                                : "error"
                        }
                        text={capitalizeFirstLetter(chass.answer)}
                        icon="assignment"
                    />
                </div>
            ))}
        </>
    );
};
