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
    getAnswerByIndex: (index: number) => { answer: string };
    save: (answer: { answer: string }, index: number) => void;
    reset: (index: number) => void;
    showNext: () => void;
    hideNext: () => void;
}

export default function BirthHistoryOneNumber({
    index,
    question,
    getAnswerByIndex,
    save,
    reset,
    showNext,
    hideNext,
}: Props) {
    const [inputWeek, setInputWeek] = useState<"ada" | "tidak" | "">("");
    const [weekLength, setWeekLength] = useState("");

    const handleSave = (answer: "ada" | "tidak") => {
        const finalAnswer = answer == "ada" ? "ada" : "tidak ada";

        save({ answer: finalAnswer }, index);
        setInputWeek(answer);

        if (inputWeek == "ada") {
            if (weekLength == "0")
                return toast.error("Jumlah bulan tidak boleh 0");

            save(
                {
                    answer: `${inputWeek}, minggu ${weekLength}`,
                },
                index
            );
        } else {
            save(
                {
                    answer: "tidak ada",
                },
                index
            );
        }

        // toast.success("Tersimpan");
    };

    const handleInputChange = (setter: (value: string) => void) => (e: any) => {
        const value = removeLeadingZeros(e.target.value);
        if (value === "" || parseInt(value) === 0) {
            setter("");
            hideNext();
        } else {
            setter(value);
            save(
                {
                    answer: `${inputWeek}, minggu ${value}`,
                },
                index
            );
            showNext();
        }
    };

    const handleReset = () => {
        reset(index);
        setInputWeek("");
    };

    useEffect(() => {
        const answer = getAnswerByIndex(index)?.answer;

        if (answer) {
            if (answer !== "tidak ada") {
                // Split the data by comma and trim spaces
                const [presence, weekDetail] = answer
                    .split(",")
                    .map((item) => item.trim());

                // Extract the week length (assumes the format is "minggu X")
                const weekLength = weekDetail.split(" ")[1]; // This will get the number part

                setInputWeek(presence as "ada");
                setWeekLength(weekLength);
            } else {
                setInputWeek("tidak");
            }

            showNext();
        } else {
            setInputWeek("");
            setWeekLength("");
        }
    }, [index]);

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
                    {question?.question}
                </p>
                <p className="text-gray-500 text-center text-small">
                    {question?.example_answer &&
                        "co: " + question?.example_answer}
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <span
                    className={`${
                        inputWeek == "ada" ? "block" : "hidden invisible"
                    }`}
                >
                    <div className="flex flex-col gap-3 items-center justify-center">
                        {/* <div className="flex gap-6 h-max items-center">
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                className="rounded-full"
                                onClick={() =>
                                    setWeekLength(
                                        weekLength !== 0 ? weekLength - 1 : 0
                                    )
                                }
                                type="button"
                            >
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                    remove
                                </span>
                            </Button>
                            <span className="text-center">
                                <p className="font-semibold tracking-tight text-2xl sm:text-3xl">
                                    {weekLength}
                                </p>
                                <p>bulan</p>
                            </span>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                className="rounded-full"
                                onClick={() => setWeekLength(weekLength + 1)}
                                type="button"
                            >
                                <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                    add
                                </span>
                            </Button>
                        </div> */}
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newWeekLength = weekLength
                                            ? parseInt(weekLength) - 1
                                            : 0;
                                        setWeekLength(
                                            newWeekLength > 0
                                                ? newWeekLength.toString()
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
                                        value={weekLength}
                                        onChange={handleInputChange(
                                            setWeekLength
                                        )}
                                        // onBlur={formik.handleBlur}
                                    />
                                </span>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newWeekLength = weekLength
                                            ? parseInt(weekLength) + 1
                                            : 1;
                                        setWeekLength(newWeekLength.toString());
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Minggu</p>
                        </div>
                        <div className="flex gap-2">
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
                </span>
                <div
                    className={`grid grid-cols-2 gap-2 w-full ${
                        inputWeek == "ada" ? "hidden invisible" : "block"
                    }`}
                >
                    <Button
                        variant={inputWeek == "ada" ? "default" : "outline"}
                        type="button"
                        onClick={() => setInputWeek("ada")}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            check
                        </span>{" "}
                        Ada
                    </Button>
                    <Button
                        variant={inputWeek == "tidak" ? "default" : "outline"}
                        type="button"
                        onClick={() => handleSave("tidak")}
                    >
                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                            close
                        </span>{" "}
                        Tidak ada
                    </Button>
                </div>
            </div>
        </>
    );
}
