"use client";

import { Button } from "@/components/ui/button";
import { ChildrenData } from "@/app/t/students/add/page";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import HealthStatusText from "../questions/HealthStatusText";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BirthHealthYNMore from "../questions/BirthHealthYNMore";
import HealthThreeNumber from "../questions/HealthThreeNumber";
import BirthHealthOption from "../questions/BirthHealthOption";
import HealthOneNumber from "../questions/HealthOneNumber";

interface Props {
    handleNextStage: () => void;
    handleBackStage: () => void;
    saveAllAnswers: (
        section: keyof ChildrenData,
        newData: Partial<ChildrenData[keyof ChildrenData]>
    ) => void;
    localData: ChildrenData;
}

type QuestionType = {
    id: number;
    type: string;
    question: string;
    example_answer?: string;
};

const treatmentLocationOptions = [
    { label: "Tidak Pernah", value: "-" },
    { label: "Rumah Sakit", value: "Rumah Sakit" },
    { label: "Puskesmas", value: "Puskesmas" },
    { label: "Bidan", value: "Bidan" },
    { label: "Dukun", value: "Dukun" },
    { label: "Klinik", value: "Klinik" },
    { label: "Rumah", value: "Rumah" },
    { label: "Lainnya", value: "other" },
];

const generalComparisonOptions = [
    { label: "Sama/Tidak ada perbedaan", value: "Sama/Tidak ada perbedaan" },
    { label: "Terlambat", value: "Terlambat" },
];

const normalOrNotOptions = [
    { label: "Normal", value: "Normal" },
    { label: "Terlambat", value: "Terlambat" },
];

const bedwettingOptions = [
    { label: "Tidak ada kelainan", value: "Tidak ada kelainan" },
    { label: "Ada kelainan", value: "other" },
];

const rules = [
    { type: "y/n_more" }, // BirthistoryYN
    { type: "text" }, // BirthistoryOneNumber
    { type: "option" }, // BirthistoryOption
    { type: "three_number" }, // BirthistoryThreeNumber
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "one_number" }, // BirthistoryNumberText
    { type: "one_number" }, // BirthistoryNumberText
    { type: "option" }, // BirthistoryOption
];

const optionsMapping: { [key: number]: { label: string; value: string }[] } = {
    2: treatmentLocationOptions,
    4: generalComparisonOptions,
    5: normalOrNotOptions,
    6: normalOrNotOptions,
    7: normalOrNotOptions,
    10: bedwettingOptions,
};

export default function HealthWrapper({
    handleNextStage,
    handleBackStage,
    saveAllAnswers,
    localData,
}: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answers, setAnswers] = useState<{ answer: string }[]>([]);
    const [subCurrentStage, setSubCurrentStage] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);

    const {
        data,
        isLoading,
    }: {
        data: { status: string; health_status_question: QuestionType[] };
        isLoading: boolean;
    } = useSWR(`/api/questions/health-status`, fetcher);

    const handleNextSubStage = () => {
        setShowNextButton(false);

        if (subCurrentStage < questions.length) {
            setSubCurrentStage(subCurrentStage + 1);
        } else {
            handleSaveToMain();
            handleNextStage();
        }
    };

    const handleBackSubStage = () => {
        if (subCurrentStage > 1) {
            setSubCurrentStage(subCurrentStage - 1);
        } else {
            handleSaveToMain();
            handleBackStage();
        }
    };

    const getAnswerByIndex = (index: number) => {
        return answers[index] || { answer: "" };
    };

    const removeCurrentAnswer = (index: number) => {
        setShowNextButton(false);

        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers.splice(index, 1);
            return newAnswers;
        });
    };

    const handleSaveToMain = () => {
        const healthStatus = {
            serious_illness: answers[0]?.answer || "",
            current_diseases: answers[1]?.answer || "",
            treatment_location: answers[2]?.answer || "",
            treatment_duration: answers[3]?.answer || "",
            general_comparison: answers[4]?.answer || "",
            crawling_development: answers[5]?.answer || "",
            sitting_development: answers[6]?.answer || "",
            walking_development: answers[7]?.answer || "",
            first_words_age: answers[8]?.answer || "",
            speaking_fluency_age: answers[9]?.answer || "",
            bedwetting: answers[10]?.answer || "",
        };

        saveAllAnswers("healthStatus", healthStatus);
    };

    const handleSaveAnswer = (answer: { answer: string }, index: number) => {
        setShowNextButton(true);

        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    const showNext = () => {
        setShowNextButton(true);
    };

    const hideNext = () => {
        setShowNextButton(false);
    };

    useEffect(() => {
        if (data && data.health_status_question) {
            setQuestions(data.health_status_question);
        }
    }, [data]);

    useEffect(() => {
        const healthStatus = localData?.healthStatus;
        if (healthStatus) {
            const newAnswers = [
                { answer: healthStatus.serious_illness || "" },
                { answer: healthStatus.current_diseases || "" },
                { answer: healthStatus.treatment_location || "" },
                { answer: healthStatus.treatment_duration || "" },
                { answer: healthStatus.general_comparison || "" },
                { answer: healthStatus.crawling_development || "" },
                { answer: healthStatus.sitting_development || "" },
                { answer: healthStatus.walking_development || "" },
                { answer: healthStatus.first_words_age || "" },
                { answer: healthStatus.speaking_fluency_age || "" },
                { answer: healthStatus.bedwetting || "" },
            ];

            // const stage = getSubCurrentStage(localData.birthHistory);
            // setSubCurrentStage(stage);
            setAnswers(newAnswers);
        }
    }, [localData]);

    const renderQuestion = (question: QuestionType, index: number) => {
        switch (rules[index].type) {
            case "y/n_more":
                return (
                    <BirthHealthYNMore
                        index={index}
                        question={question}
                        save={handleSaveAnswer}
                        getAnswerByIndex={getAnswerByIndex}
                        showNext={showNext}
                        hideNext={hideNext}
                    />
                );
            case "one_number":
                return (
                    <HealthOneNumber
                        index={index}
                        question={question}
                        getAnswerByIndex={getAnswerByIndex}
                        save={handleSaveAnswer}
                        reset={removeCurrentAnswer}
                        showNext={showNext}
                        hideNext={hideNext}
                    />
                );
            case "three_number":
                return (
                    <HealthThreeNumber
                        index={index}
                        question={question}
                        getAnswerByIndex={getAnswerByIndex}
                        save={handleSaveAnswer}
                        reset={removeCurrentAnswer}
                        showNext={showNext}
                        hideNext={hideNext}
                    />
                );
            case "option":
                return (
                    <BirthHealthOption
                        index={index}
                        question={question}
                        options={optionsMapping[index]}
                        getAnswerByIndex={getAnswerByIndex}
                        save={handleSaveAnswer}
                        reset={removeCurrentAnswer}
                        showNext={showNext}
                        hideNext={hideNext}
                    />
                );
            case "text":
                return (
                    <HealthStatusText
                        index={index}
                        question={question}
                        save={handleSaveAnswer}
                        getAnswerByIndex={getAnswerByIndex}
                        reset={removeCurrentAnswer}
                        showNext={showNext}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div>
                <div className="divider mb-1 mt-4"></div>
                <p className="text-large font-semibold tracking-tight">
                    Riwayat Kesehatan
                </p>

                {isLoading && (
                    <>
                        <div className="flex justify-center mb-3">
                            <div className="skeleton w-24 h-9 rounded-lg"></div>
                        </div>
                        <div className="w-full mb-3">
                            <AspectRatio ratio={16 / 9}>
                                <div className="skeleton w-full h-full rounded-lg"></div>
                            </AspectRatio>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center mb-3">
                            <div className="skeleton w-52 h-9 rounded-lg"></div>
                            <div className="skeleton h-9 rounded-lg w-full sm:w-72"></div>
                        </div>
                    </>
                )}

                {!isLoading && questions.length === 0 && (
                    <>
                        <p className="text-center my-20">Tidak ada soal</p>
                    </>
                )}

                {questions.length > 0 && (
                    <>
                        <div className="flex justify-center">
                            <Select
                                value={subCurrentStage.toString()}
                                onValueChange={(e) =>
                                    setSubCurrentStage(parseInt(e))
                                }
                                disabled={isLoading}
                            >
                                <SelectTrigger className="w-fit min-w-24">
                                    <SelectValue placeholder="Pilih Nomor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea className="max-h-44">
                                        {questions?.map((_, index) => (
                                            <SelectItem
                                                key={index + 1}
                                                value={`${index + 1}`}
                                            >
                                                Soal {index + 1}
                                            </SelectItem>
                                        ))}
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="my-3">
                            {questions &&
                                renderQuestion(
                                    questions[subCurrentStage - 1],
                                    subCurrentStage - 1
                                )}
                        </div>

                        <div className="divider mb-1"></div>
                        <div className="flex justify-between gap-2">
                            <Button
                                variant={"outline"}
                                type="reset"
                                onClick={handleBackSubStage}
                                disabled={isLoading}
                            >
                                <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                    arrow_back
                                </span>
                                Kembali
                            </Button>
                            {showNextButton && (
                                <Button
                                    variant={"default"}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleNextSubStage}
                                >
                                    Selanjutnya
                                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                        arrow_forward
                                    </span>
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
