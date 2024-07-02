"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

type QuestionType = {
    id: number;
    type: string;
    question: string;
    example_answer?: string;
};

interface Props {
    index: number;
    question: QuestionType;
    save: (answer: { answer: string }, index: number) => void;
    getAnswerByIndex: (index: number) => { answer: string };
    showNext: () => void;
    hideNext: () => void;
}

export default function BirthHealthYNMore({
    index,
    question,
    save,
    getAnswerByIndex,
    showNext,
    hideNext,
}: Props) {
    const [answer, setAnswer] = useState<"ya" | "tidak" | "">(
        (getAnswerByIndex(index)?.answer as "" | "ya" | "tidak") || ""
    );
    const [showDescInput, setShowDescInput] = useState(false);
    const [descInput, setDescInput] = useState("");
    const [inputError, setInputError] = useState("");

    const handleYes = () => {
        hideNext();
        setAnswer("ya");
        setShowDescInput(true);
    };

    const validateInput = () => {
        if (answer === "ya") {
            if (descInput.trim() === "") {
                setInputError("Sebutkan jika ada penyakit keras");
                hideNext();
            } else {
                setInputError("");
                save({ answer: "Ya ada, " + descInput }, index);
                showNext();
            }
        } else {
            setInputError("");
            setShowDescInput(false);
            save({ answer: "tidak" }, index);
            showNext();
        }
    };

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;
        if (data) {
            if (data.startsWith("Ya ada,")) {
                setAnswer("ya");
                const desc = data.replace("Ya ada, ", "");
                setDescInput(desc);
                setShowDescInput(true);
            } else if (data === "tidak") {
                setAnswer("tidak");
                setShowDescInput(false);
            }
        } else {
            setAnswer("");
            setDescInput("");
            setShowDescInput(false);
        }
    }, [index]);

    useEffect(() => {
        validateInput();
    }, [answer, descInput]);

    return (
        <>
            <div className="bg-gray-400 rounded-lg w-full">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={"/static/images/default.jpg"}
                        alt="Recomendation Image"
                        fill={true}
                        className="rounded-lg object-cover"
                        draggable={false}
                    />
                </AspectRatio>
            </div>
            <div className="my-3">
                <p className="text-gray-700 text-center text-medium font-semibold">
                    {question.question}
                </p>
                <p className="text-gray-500 text-center text-small">
                    {question?.example_answer &&
                        "co: " + question?.example_answer}
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div className="grid grid-cols-2 gap-2 w-full mb-3">
                    <Button
                        variant={answer === "ya" ? "default" : "outline"}
                        type="button"
                        onClick={handleYes}
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
                            setAnswer("tidak");
                        }}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak
                    </Button>
                </div>
                {showDescInput && (
                    <label className="form-control w-full">
                        <textarea
                            className="textarea textarea-bordered w-full rounded-lg"
                            placeholder="Sebutkan penyakit lainnya"
                            onChange={(e) => {
                                setDescInput(e.target.value);
                            }}
                            value={descInput}
                        ></textarea>
                        {/* <input
                            type="text"
                            name="other"
                            placeholder="Penyakit keras..."
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            value={descInput}
                            onChange={(e) => {
                                setDescInput(e.target.value);
                            }}
                        /> */}
                        {inputError && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputError}
                            </p>
                        )}
                    </label>
                )}
            </div>
        </>
    );
}
