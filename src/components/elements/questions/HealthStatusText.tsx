import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    reset: (index: number) => void;
    showNext: () => void;
}

export default function HealthStatusText({
    index,
    question,
    save,
    getAnswerByIndex,
    reset,
    showNext,
}: Props) {
    const [input, setInput] = useState("");

    useEffect(() => {
        showNext();
        const data = getAnswerByIndex(index)?.answer;
        if (data) {
            setInput(data);
        } else {
            setInput("");
        }
    }, [index]);

    useEffect(() => {
        save({ answer: input }, index);
    }, [input]);

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
                    {question?.example_answer}
                </p>
            </div>
            <div className="w-full">
                <p className="font-medium text-small mb-1">Jawaban</p>
                <div>
                    <label className="form-control w-full">
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Penyakit..."
                            className="input input-bordered rounded-lg px-3 py-2 text-sm h-fit min-h-fit w-full"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                        />
                    </label>
                </div>
            </div>
        </>
    );
}
