"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

type QuestionType = {
    id: number;
    type: string;
    question: string;
    image?: string;
    example_answer?: string;
};

interface Props {
    index: number;
    question: QuestionType;
    save: (answer: { answer: string }, index: number) => void;
    getAnswerByIndex: (index: number) => { answer: string };
    showNext: () => void;
}

export default function BirthHistoryYN({
    index,
    question,
    save,
    getAnswerByIndex,
    showNext,
}: Props) {
    const [answer, setAnswer] = useState<"ya" | "tidak" | "">(
        (getAnswerByIndex(index)?.answer as "" | "ya" | "tidak") || ""
    );

    useEffect(() => {
        if (answer == "ya" || answer == "tidak") {
            showNext();
        }
    }, [answer]);

    return (
        <>
            <div className="bg-gray-400 rounded-lg w-full dark:bg-neutral-900">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={
                            question?.image
                                ? `/static/images/child-form/${question?.image}`
                                : "/static/images/default.jpg"
                        }
                        alt="Recomendation Image"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="my-3">
                <p className="text-gray-700 text-center text-medium font-semibold dark:text-neutral-200">
                    {question.question}
                </p>
                <p className="text-gray-500 text-center text-small dark:text-neutral-400">
                    {question?.example_answer &&
                        "co: " + question?.example_answer}
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                        variant={answer === "ya" ? "default" : "outline"}
                        type="button"
                        onClick={() => {
                            save({ answer: "ya" }, index);
                            setAnswer("ya");
                        }}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Ya
                    </Button>
                    <Button
                        variant={answer === "tidak" ? "default" : "outline"}
                        type="button"
                        onClick={() => {
                            save({ answer: "tidak" }, index);
                            setAnswer("tidak");
                        }}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak
                    </Button>
                </div>
            </div>
        </>
    );
}
