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

export default function HealthThreeNumber({
    index,
    question,
    save,
    getAnswerByIndex,
    reset,
    showNext,
    hideNext,
}: Props) {
    const [monthLength, setMonthLength] = useState("0");
    const [weekLength, setWeekLength] = useState("0");
    const [dayLength, setDayLength] = useState("0");
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
        const finalAnswer = `${monthLength} Bulan, ${weekLength} Minggu, ${dayLength} Hari`;
        save({ answer: finalAnswer }, index);
    };

    const handleReset = () => {
        hideNext();
        setMonthLength("0");
        setWeekLength("0");
        setDayLength("0");
        reset(index);
    };

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;

        if (data) {
            // Split the data by comma and trim spaces
            const [weekDetail, weekLengthDetail, dayLengthDetail] = data
                .split(",")
                .map((item) => item.trim());

            // Extract the week length (assumes the format is "X Minggu")
            const monthLengthValue = weekDetail.split(" ")[0]; // This will get the number part

            // Extract the weekLength (assumes the format is "XKg")
            const weekLengthValue = weekLengthDetail.split(" ")[0];

            // Extract the dayLength (assumes the format is "XCm")
            const dayLengthValue = dayLengthDetail.split(" ")[0];

            setMonthLength(monthLengthValue);
            setWeekLength(weekLengthValue);
            setDayLength(dayLengthValue);
            showNext();
        } else {
            setMonthLength("0");
            setWeekLength("0");
            setDayLength("0");
        }
    }, [index]);

    useEffect(() => {
        setShowButton(true);
        handleSave();
        showNext();
    }, [monthLength, weekLength, dayLength]);

    return (
        <>
            <div className="bg-gray-400 rounded-lg w-full dark:bg-neutral-900">
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
                <div>
                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Lama bulan</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newMonthLength = monthLength
                                            ? parseInt(monthLength) - 1
                                            : 0;
                                        setMonthLength(
                                            newMonthLength > 0
                                                ? newMonthLength.toString()
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
                                        value={monthLength}
                                        onChange={handleInputChange(
                                            setMonthLength
                                        )}
                                        // onBlur={formik.handleBlur}
                                    />
                                </span>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newMonthLength = monthLength
                                            ? parseInt(monthLength) + 1
                                            : 1;
                                        setMonthLength(
                                            newMonthLength.toString()
                                        );
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Bulan</p>
                        </div>
                    </div>

                    <div>
                        <div className="label ps-0">
                            <span className="label-text">
                                Lama minggu (1-3)
                            </span>
                        </div>
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
                                        max={3}
                                        className="input input-bordered rounded-lg ps-0 px-3 py-2 h-fit min-h-fit font-semibold text-xlarge number-input-no-arrow text-center w-full placeholder:text-center sm:w-24 group-[.open]:w-full lg:group-[.open]:w-24"
                                        value={weekLength}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setWeekLength(
                                                removeLeadingZeros(value)
                                            );
                                        }}
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
                    </div>

                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Lama hari (1-6)</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newDayLength = dayLength
                                            ? parseInt(dayLength) - 1
                                            : 0;
                                        setDayLength(
                                            newDayLength > 0
                                                ? newDayLength.toString()
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
                                        max={6}
                                        className="input input-bordered rounded-lg ps-0 px-3 py-2 h-fit min-h-fit font-semibold text-xlarge number-input-no-arrow text-center w-full placeholder:text-center sm:w-24 group-[.open]:w-full lg:group-[.open]:w-24"
                                        value={dayLength}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setDayLength(
                                                removeLeadingZeros(value)
                                            );
                                        }}
                                        // onBlur={formik.handleBlur}
                                    />
                                </span>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newDayLength = dayLength
                                            ? parseInt(dayLength) + 1
                                            : 1;
                                        setDayLength(newDayLength.toString());
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Hari</p>
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
