import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
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
}

export default function BirthHistoryNumberText({
    index,
    question,
    save,
    getAnswerByIndex,
    reset,
    showNext,
}: Props) {
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const data = getAnswerByIndex(index)?.answer;
        if (data) {
            const parts = data.split(" sampai ");
            if (parts.length === 2) {
                setStartMonth(parts[0].replace("bulan", "").trim());
                setEndMonth(parts[1].replace("bulan", "").trim());
            }
            setShowButtons(true);
            showNext();
        } else {
            setShowButtons(false);
            setStartMonth("");
            setEndMonth("");
        }
    }, [index, getAnswerByIndex]);

    useEffect(() => {
        if (
            startMonth.trim() !== "" &&
            endMonth.trim() !== "" &&
            startMonth !== "0" &&
            endMonth !== "0"
        ) {
            handleSave();
            setShowButtons(true);
            showNext();
        }
    }, [startMonth, endMonth]);

    const handleSave = () => {
        if (startMonth.trim() === "" || endMonth.trim() === "") {
            return toast.error("Tolong isikan semua nilai");
        }
        const finalAnswer = `${startMonth} bulan sampai ${endMonth} bulan`;
        save({ answer: finalAnswer }, index);
        // toast.success("Tersimpan");
    };

    const handleReset = () => {
        setShowButtons(false);
        setStartMonth("");
        setEndMonth("");
        reset(index);
    };

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
                <div className="flex items-center gap-1.5">
                    <span>Susu Formula mulai usia</span>{" "}
                    <label className="form-control">
                        <input
                            type="number"
                            name="startMonth"
                            placeholder="0"
                            className="input rounded-none font-semibold ps-0 px-3 py-2 text-sm h-fit min-h-fit w-20 number-input-no-arrow placeholder:text-center text-center border-0 !border-b-2 focus:border-primary ring-0 focus:outline-none"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                        />
                    </label>{" "}
                    <span>bulan, sampai dengan</span>{" "}
                    <label className="form-control">
                        <input
                            type="number"
                            name="endMonth"
                            placeholder="0"
                            className="input rounded-none font-semibold ps-0 px-3 py-2 text-sm h-fit min-h-fit w-20 number-input-no-arrow placeholder:text-center text-center border-0 !border-b-2 focus:border-primary ring-0 focus:outline-none"
                            value={endMonth}
                            onChange={(e) => setEndMonth(e.target.value)}
                        />
                    </label>{" "}
                    <span>bulan</span>
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
