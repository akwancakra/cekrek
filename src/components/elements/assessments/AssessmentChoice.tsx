"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Assessment } from "@/types/assessment.types";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

interface AssessmentChoiceProps {
    isLoading?: boolean;
    assessmentAnswers: AssessmentAnswer[];
    setAssessmentData: (assessments: Assessment[]) => void;
    handleNextStage: () => void;
    handleBackStage: () => void;
    saveNewAnswer: ({
        assesmentType,
        assessmentId,
        answer,
    }: {
        assesmentType: string;
        assessmentId: string;
        answer: string;
    }) => void;
}

export default function AssessmentChoice({
    assessmentAnswers,
    setAssessmentData,
    saveNewAnswer,
    handleNextStage,
    isLoading,
}: AssessmentChoiceProps) {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [number, setNumber] = useState(1);

    const {
        data,
        isLoading: isLoadingData,
    }: {
        data: { status: string; assesments: Assessment[] };
        isLoading: boolean;
    } = useSWR(`/api/assesments`, fetcher);

    useEffect(() => {
        if (data?.assesments) {
            setAssessments(data.assesments);
            setAssessmentData(data.assesments);
        }
    }, [data]);

    useEffect(() => {
        if (assessmentAnswers.length != 20) {
            setNumber(assessmentAnswers.length + 1);
            console.log(assessmentAnswers);
        } else {
            setNumber(assessmentAnswers.length);
        }
        // else {
        //     setNumber();
        // }
    }, [assessments]);

    const incrementNumber = () => {
        setNumber((prevNumber) =>
            prevNumber < assessments.length ? prevNumber + 1 : prevNumber
        );
    };

    const decrementNumber = () => {
        setNumber((prevNumber) =>
            prevNumber > 1 ? prevNumber - 1 : prevNumber
        );
    };

    return (
        <>
            {isLoading ? (
                <div className="flex min-h-screen justify-center items-center">
                    <div className="flex items-center gap-1">
                        <span className="loading loading-spinner loading-sm"></span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            ) : (
                <section
                    key={assessments[number - 1]?.id}
                    className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2"
                >
                    {/* <div className="badge badge-outline badge-neutral">1/20</div> */}
                    <Select
                        value={number.toString()}
                        onValueChange={(e) => setNumber(parseInt(e))}
                        disabled={isLoading || isLoadingData}
                    >
                        <SelectTrigger className="w-fit min-w-24">
                            <SelectValue placeholder="Pilih Nomor" />
                        </SelectTrigger>
                        <SelectContent>
                            {assessments?.map((element, idx) => (
                                <SelectItem
                                    key={idx}
                                    value={element.assesment_number.toString()}
                                >
                                    Soal {element.assesment_number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-gray-500 text-center text-small">
                        {assessments[number - 1]?.question}
                    </p>
                    <div className="bg-gray-400 rounded-lg w-full overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={`/static/images/${
                                    assessments[number - 1]?.picture ||
                                    "default.jpg"
                                }`}
                                alt="Assessment Image"
                                width={400}
                                height={225}
                                className="rounded-lg w-full h-full object-cover"
                                draggable={false}
                            />
                        </AspectRatio>
                    </div>
                    <div className="w-full">
                        <p className="font-medium text-small mb-1">Jawaban</p>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {assessments?.length > 0 && (
                                <>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        number - 1
                                                    ]?.id.toString(),
                                                answer: "ya",
                                                assesmentType: "awal",
                                            });
                                            incrementNumber();
                                        }}
                                        disabled={isLoading || isLoadingData}
                                    >
                                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                            check
                                        </span>{" "}
                                        Ya
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        number - 1
                                                    ]?.id.toString(),
                                                answer: "tidak",
                                                assesmentType: "awal",
                                            });
                                            incrementNumber();
                                        }}
                                        disabled={isLoading || isLoadingData}
                                    >
                                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                            close
                                        </span>{" "}
                                        Tidak
                                    </Button>
                                </>
                            )}
                        </div>
                        {assessmentAnswers?.length == assessments?.length && (
                            <div className="flex justify-end w-full mt-2">
                                <Button
                                    variant={"default"}
                                    onClick={handleNextStage}
                                    disabled={isLoading || isLoadingData}
                                >
                                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                        check
                                    </span>{" "}
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
