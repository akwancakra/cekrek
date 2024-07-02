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
import { useCounter } from "usehooks-ts";

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
    // BUAT NYIMPEN SEMUA HASIL JAWABAN CHOICE
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    // const [number, setNumber] = useState(1);
    const { count, setCount, increment, decrement, reset } = useCounter(1);

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
            setCount(assessmentAnswers.length + 1);
            console.log(assessmentAnswers);
        } else {
            setCount(assessmentAnswers.length);
        }
        // else {
        //     setNumber();
        // }
    }, [assessments]);

    const handleIncrement = () => {
        if (count < assessments.length) {
            increment();
        }
    };

    const isActiveButton = (
        index: number,
        answer: string
    ): "default" | "outline" => {
        let isActive: "default" | "outline" = "outline";
        assessmentAnswers.forEach((item) => {
            if (item.assesment_id == assessments[index].id.toString()) {
                if (item.answer == answer) {
                    isActive = "default";
                }
            }
        });

        return isActive;
    };

    // const incrementNumber = () => {
    //     setNumber((prevNumber) =>
    //         prevNumber < assessments.length ? prevNumber + 1 : prevNumber
    //     );
    // };

    // const decrementNumber = () => {
    //     setNumber((prevNumber) =>
    //         prevNumber > 1 ? prevNumber - 1 : prevNumber
    //     );
    // };

    return (
        <>
            {isLoading || isLoadingData ? (
                <div className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
                    <div className="skeleton h-8 w-1/3 rounded-lg"></div>
                    <div className="skeleton w-full">
                        <AspectRatio ratio={16 / 9}></AspectRatio>
                    </div>
                    <div className="skeleton h-8 w-1/2 rounded-lg"></div>
                    <div className="skeleton h-8 w-full rounded-lg"></div>
                    <div className="skeleton h-8 w-3/4 rounded-lg"></div>
                </div>
            ) : (
                <section
                    key={assessments[count - 1]?.id}
                    className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2"
                >
                    <Select
                        value={count.toString()}
                        defaultValue={count.toString()}
                        onValueChange={(e) => setCount(parseInt(e))}
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
                        {assessments[count - 1]?.question}
                    </p>
                    <div className="bg-gray-400 rounded-lg w-full overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={`/static/images/${
                                    assessments[count - 1]?.picture ||
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
                                        variant={isActiveButton(
                                            count - 1,
                                            "ya"
                                        )}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        count - 1
                                                    ]?.id.toString(),
                                                answer: "ya",
                                                assesmentType: "awal",
                                            });
                                            handleIncrement();
                                            // incrementNumber();
                                        }}
                                        disabled={isLoading || isLoadingData}
                                    >
                                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                            check
                                        </span>{" "}
                                        Ya
                                    </Button>
                                    <Button
                                        variant={isActiveButton(
                                            count - 1,
                                            "tidak"
                                        )}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        count - 1
                                                    ]?.id.toString(),
                                                answer: "tidak",
                                                assesmentType: "awal",
                                            });
                                            handleIncrement();
                                            // incrementNumber();
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
