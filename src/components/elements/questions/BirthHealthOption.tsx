"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    options: { label: string; value: string }[];
    getAnswerByIndex: (index: number) => { answer: string };
    save: (answer: { answer: string }, index: number) => void;
    reset: (index: number) => void;
    showNext: () => void;
    hideNext: () => void;
}

export default function BirthHealthOption({
    index,
    question,
    options,
    getAnswerByIndex,
    save,
    reset,
    showNext,
    hideNext,
}: Props) {
    const [selectedOption, setSelectedOption] = useState("");
    const [otherInput, setOtherInput] = useState("");
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const handleSelectChange = (value: string) => {
        setSelectedOption(value);

        if (value === "other") {
            hideNext();
            setShowOtherInput(true);
            setOtherInput("");
        } else {
            setShowButtons(true);
            setShowOtherInput(false);
            setOtherInput("");
            handleSave(value);
            showNext();
        }
    };

    const handleSave = (option?: string) => {
        const finalAnswer =
            (option || selectedOption) === "other"
                ? otherInput
                : option || selectedOption;
        if (selectedOption === "other" && otherInput.trim() === "") {
            return toast.error("Tolong isikan detil pada input lainnya");
        }

        save({ answer: finalAnswer }, index);
    };

    const handleReset = () => {
        hideNext();
        setShowButtons(false);
        setSelectedOption("");
        setOtherInput("");
        setShowOtherInput(false);
        reset(index);
    };

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;

        if (data && data.trim() !== "") {
            const isOption = options.some((option) => option.value === data);
            if (isOption) {
                setSelectedOption(data);
                setShowOtherInput(false);
                setOtherInput("");
            } else {
                setSelectedOption("other");
                setShowOtherInput(true);
                setOtherInput(data);
            }

            setShowButtons(true);
            showNext();
        } else {
            hideNext();
            setShowButtons(false);
            setSelectedOption("");
            setShowOtherInput(false);
            setOtherInput("");
        }
    }, [index, getAnswerByIndex]);

    useEffect(() => {
        if (selectedOption === "other" && otherInput.trim() !== "") {
            handleSave();
            showNext();
        }
    }, [otherInput]);

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
                <div className="mb-3">
                    <div className="mb-3">
                        <Select
                            name="birth_assistance"
                            onValueChange={handleSelectChange}
                            value={selectedOption}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Jawaban" />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="max-h-44">
                                    {options.map((data) => (
                                        <SelectItem
                                            key={data.value}
                                            value={data.value}
                                        >
                                            {data.label}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    </div>
                    {showOtherInput && (
                        <label className="form-control w-full">
                            <input
                                type="text"
                                name="other"
                                placeholder="Lainnya..."
                                className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                                value={otherInput}
                                onChange={(e) => {
                                    setOtherInput(e.target.value);
                                }}
                            />
                        </label>
                    )}
                </div>

                {showButtons && (
                    <div className="mt-3 flex justify-center gap-2">
                        <Button variant="outline" onClick={handleReset}>
                            <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                close
                            </span>{" "}
                            Reset
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
