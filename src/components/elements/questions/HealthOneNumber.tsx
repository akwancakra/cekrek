"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { removeLeadingZeros } from "@/utils/converters";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    reset: (index: number) => void;
    showNext: () => void;
    hideNext: () => void;
}

export default function HealthOneNumber({
    index,
    question,
    save,
    getAnswerByIndex,
    reset,
    showNext,
    hideNext,
}: Props) {
    const [year, setYear] = useState("");
    const [showButton, setShowButton] = useState(false);

    const handleInputChange = (setter: (value: string) => void) => (e: any) => {
        const value = removeLeadingZeros(e.target.value);
        if (value === "" || parseInt(value) === 0) {
            setter("");
        } else {
            setter(value);
        }
    };

    const handleSave = () => {
        if (year == "0")
            return toast.error('Lama kehamilan tidak boleh bernilai "0"');

        const finalAnswer = `${year} Tahun`;
        save({ answer: finalAnswer }, index);
    };

    const handleReset = () => {
        hideNext();
        setYear("");
        reset(index);
    };

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;

        if (data) {
            // Extract the week length (assumes the format is "X Minggu")
            const yearValue = data.split(" ")[0]; // This will get the number part

            setYear(yearValue);
            showNext();
        } else {
            setYear("");
        }
    }, [index]);

    useEffect(() => {
        if (year !== "" && year !== "0") {
            setShowButton(true);
            handleSave();
            showNext();
        } else {
            setShowButton(false);
            hideNext();
        }
    }, [year]);

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
                <div>
                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Masukan tahun</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newYear = year
                                            ? parseInt(year) - 1
                                            : 0;
                                        setYear(
                                            newYear > 0
                                                ? newYear.toString()
                                                : "0"
                                        );
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        remove
                                    </span>
                                </Button>
                                <span className="text-center">
                                    <input
                                        type="number"
                                        name="duration_pregnant"
                                        placeholder="0"
                                        className="input input-bordered rounded-lg ps-0 px-3 py-2 h-fit min-h-fit font-semibold text-xlarge number-input-no-arrow text-center w-full placeholder:text-center sm:w-24 group-[.open]:w-full lg:group-[.open]:w-24"
                                        value={year}
                                        onChange={handleInputChange(setYear)}
                                    />
                                </span>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newYear = year
                                            ? parseInt(year) + 1
                                            : 1;
                                        setYear(newYear.toString());
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Tahun</p>
                        </div>
                    </div>

                    <div
                        className={`flex justify-center mt-3 gap-2 ${
                            showButton ? "block" : "hidden"
                        }`}
                    >
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={handleReset}
                        >
                            <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                close
                            </span>{" "}
                            Batal
                        </Button>
                        {/* <Button
                            variant={"default"}
                            type="button"
                            onClick={handleSave}
                        >
                            <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                save
                            </span>{" "}
                            Simpan
                        </Button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
