"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Assessment } from "@/types/assessment.types";
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import Image from "next/image";
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
import { useCounter, useMediaQuery } from "usehooks-ts";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface AssessmentChoiceProps {
    isLoading?: boolean;
    assessmentAnswers: AssessmentAnswer[];
    setAssessmentData: (assessments: Assessment[]) => void;
    handleNextStage: () => void;
    handleBackStage: () => void;
    saveNewAnswer: ({
        assesmentType,
        assessmentId,
        answer,
    }: {
        assesmentType: string;
        assessmentId: string;
        answer: string;
    }) => void;
}

export default function AssessmentChoice({
    assessmentAnswers,
    setAssessmentData,
    saveNewAnswer,
    handleNextStage,
    isLoading,
}: AssessmentChoiceProps) {
    // BUAT NYIMPEN SEMUA HASIL JAWABAN CHOICE
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    // const [number, setNumber] = useState(1);
    const { count, setCount, increment, decrement, reset } = useCounter(1);

    const {
        data,
        isLoading: isLoadingData,
    }: {
        data: { status: string; assesments: Assessment[] };
        isLoading: boolean;
    } = useSWR(`/api/assesments`, fetcher);

    useEffect(() => {
        if (data?.assesments) {
            setAssessments(data.assesments);
            setAssessmentData(data.assesments);
        }
    }, [data]);

    useEffect(() => {
        if (assessmentAnswers.length != 20) {
            setCount(assessmentAnswers.length + 1);
            console.log(assessmentAnswers);
        } else {
            setCount(assessmentAnswers.length);
        }
        // else {
        //     setNumber();
        // }
    }, [assessments]);

    const handleIncrement = () => {
        if (count < assessments.length) {
            increment();
        }
    };

    const isActiveButton = (
        index: number,
        answer: string
    ): "default" | "outline" => {
        let isActive: "default" | "outline" = "outline";
        assessmentAnswers.forEach((item) => {
            if (item.assesment_id == assessments[index].id.toString()) {
                if (item.answer == answer) {
                    isActive = "default";
                }
            }
        });

        return isActive;
    };

    const getAssessmentImage = (picture: string): string => {
        if (picture) {
            return `/static/images/assessments/${picture}`;
        }

        return "/static/images/default.jpg";
    };

    // const incrementNumber = () => {
    //     setNumber((prevNumber) =>
    //         prevNumber < assessments.length ? prevNumber + 1 : prevNumber
    //     );
    // };

    // const decrementNumber = () => {
    //     setNumber((prevNumber) =>
    //         prevNumber > 1 ? prevNumber - 1 : prevNumber
    //     );
    // };

    return (
        <>
            {isLoading || isLoadingData ? (
                <div className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
                    <div className="skeleton h-8 w-1/3 rounded-lg"></div>
                    <div className="skeleton w-full">
                        <AspectRatio ratio={16 / 9}></AspectRatio>
                    </div>
                    <div className="skeleton h-8 w-1/2 rounded-lg"></div>
                    <div className="skeleton h-8 w-full rounded-lg"></div>
                    <div className="skeleton h-8 w-3/4 rounded-lg"></div>
                </div>
            ) : (
                <section
                    key={assessments[count - 1]?.id}
                    className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2"
                >
                    <div className="flex gap-2 justify-center">
                        <Select
                            value={count.toString()}
                            defaultValue={count.toString()}
                            onValueChange={(e) => setCount(parseInt(e))}
                            disabled={isLoading || isLoadingData}
                        >
                            <SelectTrigger className="w-fit min-w-24">
                                <SelectValue placeholder="Pilih Nomor" />
                            </SelectTrigger>
                            <SelectContent>
                                {assessments?.map((element, idx) => (
                                    <SelectItem
                                        key={idx}
                                        value={element.assesment_number.toString()}
                                    >
                                        Soal {element.assesment_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <HelpQuestion index={count} />
                    </div>
                    <p className="text-gray-500 text-center text-small dark:text-gray-300">
                        {assessments[count - 1]?.question}
                    </p>
                    <div className="bg-gray-400 rounded-lg w-full overflow-hidden dark:bg-neutral-900">
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={getAssessmentImage(
                                    assessments[count - 1]?.picture
                                )}
                                alt="Assessment Image"
                                // width={400}
                                // height={225}
                                fill={true}
                                className="rounded-lg object-cover"
                                draggable={false}
                            />
                        </AspectRatio>
                    </div>
                    <div className="w-full">
                        <p className="font-medium text-small mb-1">Jawaban</p>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {assessments?.length > 0 && (
                                <>
                                    <Button
                                        variant={isActiveButton(
                                            count - 1,
                                            "ya"
                                        )}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        count - 1
                                                    ]?.id.toString(),
                                                answer: "ya",
                                                assesmentType: "awal",
                                            });
                                            handleIncrement();
                                            // incrementNumber();
                                        }}
                                        disabled={isLoading || isLoadingData}
                                    >
                                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                            check
                                        </span>{" "}
                                        Ya
                                    </Button>
                                    <Button
                                        variant={isActiveButton(
                                            count - 1,
                                            "tidak"
                                        )}
                                        onClick={() => {
                                            saveNewAnswer({
                                                assessmentId:
                                                    assessments?.[
                                                        count - 1
                                                    ]?.id.toString(),
                                                answer: "tidak",
                                                assesmentType: "awal",
                                            });
                                            handleIncrement();
                                            // incrementNumber();
                                        }}
                                        disabled={isLoading || isLoadingData}
                                    >
                                        <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                            close
                                        </span>{" "}
                                        Tidak
                                    </Button>
                                </>
                            )}
                        </div>
                        {assessmentAnswers?.length == assessments?.length && (
                            <div className="flex justify-end w-full mt-2">
                                <Button
                                    variant={"default"}
                                    onClick={handleNextStage}
                                    disabled={isLoading || isLoadingData}
                                >
                                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                                        check
                                    </span>{" "}
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

const HelpQuestion = ({ index }: { index: number }) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"outline"} className="gap-1">
                        <span>Info</span>
                        <span className="material-symbols-outlined !text-lg !leading-none pointer-events-none">
                            info
                        </span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-0">
                    <ScrollArea className="max-h-[80vh] p-3">
                        <AlertDialogHeader className="m-1">
                            <AlertDialogTitle className="hidden">
                                Bantuan
                            </AlertDialogTitle>
                            Bantuan Pertanyaan {index}
                            <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                            <div className="relative rounded-lg bg-gray-400 w-full dark:bg-neutral-800">
                                <AspectRatio
                                    ratio={3 / 4}
                                    className="rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={`/static/images/assessments/question-${index}.png`}
                                        alt="Recomendation Image"
                                        fill={true}
                                        className="object-contain"
                                        draggable={false}
                                    />
                                </AspectRatio>
                            </div>
                            <AlertDialogDescription />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Tutup</AlertDialogCancel>
                        </AlertDialogFooter>
                    </ScrollArea>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={"outline"} className="gap-1">
                    <span>Info</span>
                    <span className="material-symbols-outlined !text-lg !leading-none pointer-events-none">
                        info
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                {/* <ScrollArea className="max-h-[70vh] p-0"> */}
                <DrawerHeader className="text-left">
                    <DrawerTitle>Bantuan Pertanyaan {index}</DrawerTitle>
                    <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>
                    <div className="relative rounded-lg bg-gray-400 w-full dark:bg-neutral-800">
                        <AspectRatio
                            ratio={3 / 4}
                            className="rounded-lg overflow-hidden"
                        >
                            <Image
                                src={`/static/images/assessments/question-${index}.png`}
                                alt="Recomendation Image"
                                fill={true}
                                className="object-contain"
                                draggable={false}
                            />
                        </AspectRatio>
                    </div>
                    <DrawerDescription />
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" className="text-medium">
                            Tutup
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
                {/* </ScrollArea> */}
            </DrawerContent>
        </Drawer>
    );
};
