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

export default function BirthHistoryThreeNumber({
    index,
    question,
    save,
    getAnswerByIndex,
    reset,
    showNext,
    hideNext,
}: Props) {
    const [weekLength, setWeekLength] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
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
        if (weekLength == "0")
            return toast.error('Lama kehamilan tidak boleh bernilai "0"');
        if (weight == "0")
            return toast.error('Berat bayi tidak boleh bernilai "0"');
        if (height == "0")
            return toast.error('Tinggi badan tidak boleh bernilai "0"');

        const finalAnswer = `${weekLength} Minggu, ${weight}Kg, ${height}Cm`;
        save({ answer: finalAnswer }, index);
        // toast.success("Tersimpan");
    };

    const handleReset = () => {
        hideNext();
        setWeekLength("");
        setWeight("");
        setHeight("");
        reset(index);
    };

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;

        if (data) {
            // Split the data by comma and trim spaces
            const [weekDetail, weightDetail, heightDetail] = data
                .split(",")
                .map((item) => item.trim());

            // Extract the week length (assumes the format is "X Minggu")
            const weekLengthValue = weekDetail.split(" ")[0]; // This will get the number part

            // Extract the weight (assumes the format is "XKg")
            const weightValue = weightDetail.replace("Kg", "").trim();

            // Extract the height (assumes the format is "XCm")
            const heightValue = heightDetail.replace("Cm", "").trim();

            setWeekLength(weekLengthValue);
            setWeight(weightValue);
            setHeight(heightValue);
            showNext();
        } else {
            setWeekLength("");
            setWeight("");
            setHeight("");
        }
    }, [index]);

    useEffect(() => {
        if (
            weekLength !== "" &&
            weight !== "" &&
            height !== "" &&
            weekLength !== "0" &&
            weight !== "0" &&
            height !== "0"
        ) {
            setShowButton(true);
            handleSave();
            showNext();
        } else {
            setShowButton(false);
            hideNext();
        }
    }, [weekLength, weight, height]);

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
                <div className="border border-gray-300 rounded-lg p-2 dark:border-neutral-600">
                    <p className="font-semibold text-medium">Panduan</p>
                    <p className="text-medium">
                        Gunakan koma &quot;,&quot; untuk memberikan nilai
                        desimal, cth: &quot;30,2&quot;, &quot;32,5&quot;
                    </p>
                </div>
                <div>
                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Lama kehamilan</span>
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
                    </div>

                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Berat bayi</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newWeight = weight
                                            ? parseInt(weight) - 1
                                            : 0;
                                        setWeight(
                                            newWeight > 0
                                                ? newWeight.toString()
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
                                        value={weight}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setWeight(
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
                                        const newWeight = weight
                                            ? parseInt(weight) + 1
                                            : 1;
                                        setWeight(newWeight.toString());
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Kg</p>
                        </div>
                    </div>

                    <div>
                        <div className="label ps-0">
                            <span className="label-text">Tinggi badan</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-max items-center gap-2 sm:gap-6 group-[.open]:gap-2 lg:group-[.open]:gap-6">
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                    onClick={() => {
                                        const newHeight = height
                                            ? parseInt(height) - 1
                                            : 0;
                                        setHeight(
                                            newHeight > 0
                                                ? newHeight.toString()
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
                                        value={height}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setHeight(
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
                                        const newHeight = height
                                            ? parseInt(height) + 1
                                            : 1;
                                        setHeight(newHeight.toString());
                                    }}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined cursor-pointer !text-xl !leading-none">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <p>Cm</p>
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
