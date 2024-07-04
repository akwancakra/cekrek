"use client";

import { Button } from "@/components/ui/button";
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
import BirthHistoryYN from "../questions/BirthHistoryYN";
import BirthHistoryThreeNumber from "../questions/BirthHistoryThreeNumber";
import BirthHistoryOneNumber from "../questions/BirthHistoryOneNumber";
import BirthHistoryOption from "../questions/BirthHealthOption";
import BirthHistoryNumberText from "../questions/BirthHistoryNumberText";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChildrenData } from "@/app/t/students/add/page";
import BirthHealthOption from "../questions/BirthHealthOption";
import { getSubCurrentStage } from "@/utils/converters";

interface Props {
    handleNextStage: () => void;
    handleBackStage: () => void;
    saveAllAnswers: (
        section: keyof ChildrenData,
        newData: Partial<ChildrenData[keyof ChildrenData]>
    ) => void;
    localData: ChildrenData;
}

const birthPlaceOptions = [
    { label: "Rumah Sakit", value: "Rumah Sakit" },
    { label: "Puskesmas", value: "Puskesmas" },
    { label: "Bidan", value: "Bidan" },
    { label: "Dukun", value: "Dukun" },
    { label: "Klinik", value: "Klinik" },
    { label: "Rumah", value: "Rumah" },
    { label: "Lainnya", value: "other" },
];

const birthAssistanceOptions = [
    { label: "Dokter", value: "Dokter" },
    { label: "Bidan", value: "Bidan" },
    { label: "Suster", value: "Suster" },
    { label: "Keluarga", value: "Keluarga" },
    { label: "Dukun", value: "Dukun" },
    { label: "Lainnya", value: "other" },
];

const deliveryProcessOptions = [
    { label: "Normal", value: "Normal" },
    { label: "Caesar", value: "Caesar" },
    { label: "Vakum", value: "Vakum" },
    { label: "Forceps", value: "Forceps" },
    { label: "Lainnya", value: "other" },
];

const congenitalAnomaliesOptions = [
    { label: "Tidak ada", value: "Tidak ada" },
    { label: "Tuli", value: "Tuli" },
    { label: "Buta", value: "Buta" },
    { label: "Bibir Sumbing", value: "Bibir Sumbing" },
    { label: "Juling", value: "Juling" },
    { label: "Lainnya", value: "other" },
];

const firstFoodOptions = [
    { label: "ASI", value: "ASI" },
    { label: "Susu Formula", value: "Susu Formula" },
    { label: "MPASI", value: "MPASI" },
    { label: "Makanan Padat", value: "Makanan Padat" },
    { label: "Lainnya", value: "other" },
];

const immunizationOptions = [
    { label: "Lengkap", value: "Lengkap" },
    { label: "Tidak Lengkap", value: "Tidak Lengkap" },
    { label: "Tidak Sama Sekali", value: "Tidak Sama Sekali" },
];

const rules = [
    { type: "y/n" }, // BirthistoryYN
    { type: "one_number" }, // BirthistoryOneNumber
    { type: "three_number" }, // BirthistoryThreeNumber
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "option" }, // BirthistoryOption
    { type: "number_text" }, // BirthistoryNumberText
    { type: "option" }, // BirthistoryOption
];

const optionsMapping: { [key: number]: { label: string; value: string }[] } = {
    3: birthPlaceOptions,
    4: birthAssistanceOptions,
    5: deliveryProcessOptions,
    6: congenitalAnomaliesOptions,
    7: firstFoodOptions,
    9: immunizationOptions,
};

type QuestionType = {
    id: number;
    type: string;
    question: string;
    example_answer?: string;
};

export default function BirthWrapper({
    handleNextStage,
    handleBackStage,
    saveAllAnswers,
    localData,
}: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answers, setAnswers] = useState<{ answer: string }[]>([]);
    const [subCurrentStage, setSubCurrentStage] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);

    const { data, isLoading } = useSWR(`/api/questions/birth-history`, fetcher);

    const handleNextSubStage = () => {
        setShowNextButton(false);

        if (subCurrentStage < questions.length) {
            setSubCurrentStage(subCurrentStage + 1);
        } else {
            handleSaveToMain();
            handleNextStage();
        }

        console.log(answers);
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
        const birthHistory = {
            healthy_pregnancy: answers[0]?.answer || "",
            pregnancy_illness: answers[1]?.answer || "",
            gestation_details: answers[2]?.answer || "",
            birthplace: answers[3]?.answer || "",
            birth_assistance: answers[4]?.answer || "",
            delivery_process: answers[5]?.answer || "",
            congenital_anomalies: answers[6]?.answer || "",
            first_food: answers[7]?.answer || "",
            formula_milk: answers[8]?.answer || "",
            immunization: answers[9]?.answer || "",
        };

        saveAllAnswers("birthHistory", birthHistory);
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
        if (data && data.birth_history_question) {
            setQuestions(data.birth_history_question);
        }
    }, [data]);

    useEffect(() => {
        const birthHistory = localData?.birthHistory;
        if (birthHistory) {
            const newAnswers = [
                { answer: birthHistory.healthy_pregnancy || "" },
                { answer: birthHistory.pregnancy_illness || "" },
                { answer: birthHistory.gestation_details || "" },
                { answer: birthHistory.birthplace || "" },
                { answer: birthHistory.birth_assistance || "" },
                { answer: birthHistory.delivery_process || "" },
                { answer: birthHistory.congenital_anomalies || "" },
                { answer: birthHistory.first_food || "" },
                { answer: birthHistory.formula_milk || "" },
                { answer: birthHistory.immunization || "" },
            ];

            // const stage = getSubCurrentStage(localData.birthHistory);
            // setSubCurrentStage(stage);
            setAnswers(newAnswers);
        }
    }, [localData]);

    const renderQuestion = (question: QuestionType, index: number) => {
        switch (rules[index].type) {
            case "y/n":
                return (
                    <BirthHistoryYN
                        index={index}
                        question={question}
                        save={handleSaveAnswer}
                        getAnswerByIndex={getAnswerByIndex}
                        showNext={showNext}
                    />
                );
            case "one_number":
                return (
                    <BirthHistoryOneNumber
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
                    <BirthHistoryThreeNumber
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
            case "number_text":
                return (
                    <BirthHistoryNumberText
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
                    Riwayat Lahir
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
