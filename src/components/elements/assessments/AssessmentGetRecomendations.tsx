"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CreateRecomendationCard from "../cards/CreateRecomendationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import StandardRecomendation from "../forms/StandardRecomendation";
import DurationRecomendation from "../forms/DurationRecomendation";
import RepetitionRecomendation from "../forms/RepetitionRecomendation";
import { useMediaQuery } from "usehooks-ts";
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
import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { getRiskCategory } from "@/utils/converters";
import { Child } from "@/types/children.types";
import axios from "axios";
import { toast } from "sonner";
import { Recommendation } from "@/types/recommendation.type";
import { useRouter } from "next/navigation";

interface AssessmentGetRecommendationsProps {
    child: Child;
    assessmentAnswer: AssessmentAnswer[];
    handleBackStage: () => void;
    removeAssessmentAnswer: () => void;
    isLoading?: boolean;
}

export default function AssessmentGetRecommendations({
    child,
    assessmentAnswer,
    handleBackStage,
    removeAssessmentAnswer,
    isLoading,
}: AssessmentGetRecommendationsProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [activeTab, setActiveTab] = useState("standar");
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
    const [riskCategory, setRiskCategory] = useState<string>("");
    const [recommendations, setRecommendations] = useState<Recommendation[]>(
        []
    );

    const { push } = useRouter();

    const fetchRecommendations = async () => {
        setIsLoadingPost(true);

        const data = createDataObject(
            assessmentAnswer.filter(
                (item) => item.answer === "tidak" || item.answer == "gagal"
            )
        );

        await axios
            .get(`/api/recommendations?data=${JSON.stringify(data)}`)
            .then((res) => {
                toast.success("Berhasil mendapatkan rekomendasi!");
                setRecommendations(res.data?.recommendations || []);
                removeAssessmentAnswer();
                console.log(res.data);

                setIsLoadingPost(false);
            })
            .catch((err) => {
                if (err?.response.status === 400) {
                    toast.error(err?.response?.data?.message);
                } else if (err?.response.status === 500) {
                    toast.error("Server Error");
                } else {
                    toast.error("Terjadi kesalahan");
                }
                setIsLoadingPost(false);
            });
    };

    const createDataObject = (inputArray: AssessmentAnswer[]) => {
        const assesments = inputArray.map((item) => ({
            assesment_number:
                item.assesment?.assesment_number || item.assesment_id,
        }));

        return {
            risk_category: riskCategory,
            assesments,
        };
    };

    const createDataObjectFinal = () => {
        const currentDate = new Date();

        const assessmentsAnswer = assessmentAnswer.map((item) => ({
            assessment_id: item.assesment_id,
            answer: item.answer,
        }));

        const childRecommendations = recommendations.map((recommendation) => {
            if (recommendation.id) {
                return {
                    recommendation_id: recommendation.id,
                    child_id: child?.id || null,
                };
            } else {
                return {
                    assesment_number: recommendation.assesment_number,
                    is_main: recommendation.is_main,
                    title: recommendation.title,
                    description: recommendation.description,
                    icon: recommendation.icon,
                    frequency: recommendation.frequency,
                    risk_category: recommendation.risk_category,
                    child_id: child?.id || null,
                };
            }
        });

        return {
            child_id: child?.id || null,
            date_time: currentDate,
            assessmentsAnswer,
            childRecommendations,
        };
    };

    useEffect(() => {
        const risk = getRiskCategory({
            childAssesment: assessmentAnswer,
            type: "awal",
        });
        setRiskCategory(risk);
    });

    useEffect(() => {
        if (riskCategory) {
            fetchRecommendations();
        }
    }, [riskCategory]);

    const onTabChange = (value: string) => {
        setActiveTab(value);
    };

    const addRecommendationButton = () => {
        // console.log("Recomendation Button Clicked!");
    };

    const removeRecommendation = (id: string) => {
        setRecommendations((prevRecommendations) =>
            prevRecommendations.filter((item) => item.id.toString() !== id)
        );
    };

    const handleSubmitRecommendation = async () => {
        setIsLoadingPost(true);

        const data = createDataObjectFinal();
        console.log(data);

        try {
            await axios.post("/api/recommendations", data);
            toast.success("Berhasil mengirim rekomendasi!");
            push(`/t/students/${child?.id}`);
        } catch (err: any) {
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message);
            } else if (err?.response?.status === 500) {
                toast.error("Server Error");
            } else {
                toast.error("Terjadi kesalahan");
            }
        } finally {
            setIsLoadingPost(false);
        }
    };

    return (
        <section className="mx-auto max-w-7xl flex flex-col justify-center items-center w-full h-full gap-2 p-2">
            <div className="w-full border border-gray-300 rounded-lg p-2">
                <div>
                    <p className="text-gray-400 text-xs">
                        Rekomendasi Hasil Asesmen M-Chart-R/F
                    </p>
                    <p className="text-large tracking-tight font-semibold">
                        {child?.full_name || "N/A"}
                    </p>
                </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 p-3 overflow-hidden">
                <div className="rounded-lg p-4 w-full flex items-center text-white bg-primary h-fit sm:min-h-24">
                    <div>
                        <p className="text-xs -mb-1">Kategori</p>
                        <p className="font-semibold tracking-tight text-large">
                            {riskCategory || "N/A"}
                        </p>
                    </div>
                </div>
                <div className="w-full justify-between items-center my-3 sm:flex group-[.open]:block md:group-[.open]:flex">
                    {isDesktop ? (
                        <RecomendationFormDesktop
                            activeTab={activeTab}
                            onTabChange={onTabChange}
                            addRecomendationButton={addRecommendationButton}
                        />
                    ) : (
                        <RecomendationForm
                            activeTab={activeTab}
                            onTabChange={onTabChange}
                            addRecomendationButton={addRecommendationButton}
                        />
                    )}
                    <Button
                        variant={"default"}
                        className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                        disabled={isLoading || isLoadingPost}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                        </svg>
                        <span>Rekomendasi AI</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-3">
                    {recommendations && recommendations.length === 0 && (
                        <div>
                            <p className="text-center text-small">
                                Tidak ada rekomendasi
                            </p>
                        </div>
                    )}
                    {recommendations &&
                        recommendations.length > 0 &&
                        recommendations.map((recommendation) => (
                            <CreateRecomendationCard
                                key={recommendation.id}
                                recommendation={recommendation}
                                onDelete={removeRecommendation}
                            />
                        ))}
                </div>
            </div>
            <div className="flex gap-3 w-full mb-3 justify-between sm:justify-end">
                <Button
                    variant={"outline"}
                    className="gap-1"
                    onClick={handleBackStage}
                    disabled={isLoading || isLoadingPost}
                >
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        chevron_left
                    </span>
                    <span>Kembali</span>
                </Button>
                <Button
                    variant={"outline"}
                    className="gap-1"
                    onClick={handleSubmitRecommendation}
                    disabled={isLoading || isLoadingPost}
                >
                    <span>Selesai &amp; Kirim</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        check
                    </span>
                </Button>
            </div>
        </section>
    );
}

const RecomendationForm = ({
    activeTab,
    onTabChange,
    addRecomendationButton,
}: {
    activeTab: string;
    onTabChange: (value: string) => void;
    addRecomendationButton: () => void;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                >
                    <span>Tambah Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        assignment_add
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
                <ScrollArea className="max-h-[70vh] p-0">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit profile</DrawerTitle>
                        <DrawerDescription>
                            <div>
                                <p className="text-sm mb-1">Tipe</p>
                                <Tabs
                                    defaultValue="standar"
                                    value={activeTab}
                                    onValueChange={onTabChange}
                                >
                                    <TabsList>
                                        <TabsTrigger value="standar">
                                            Standar
                                        </TabsTrigger>
                                        <TabsTrigger value="durasi">
                                            Durasi
                                        </TabsTrigger>
                                        <TabsTrigger value="repetisi">
                                            Repetisi
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="standar">
                                        <StandardRecomendation />
                                    </TabsContent>
                                    <TabsContent value="durasi">
                                        <DurationRecomendation />
                                    </TabsContent>
                                    <TabsContent value="repetisi">
                                        <RepetitionRecomendation />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            variant={"default"}
                            onClick={() => addRecomendationButton()}
                        >
                            Tambah
                        </Button>
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="text-medium"
                                disabled={true}
                            >
                                Batal
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
};

const RecomendationFormDesktop = ({
    activeTab,
    onTabChange,
    addRecomendationButton,
}: {
    activeTab: string;
    onTabChange: (value: string) => void;
    addRecomendationButton: () => void;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="gap-1 w-full mt-2 sm:w-fit sm:mt-0 group-[.open]:mt-2 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-fit"
                >
                    <span>Tambah Rekomendasi</span>
                    <span className="material-symbols-outlined !text-xl !leading-none pointer-events-none">
                        assignment_add
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <ScrollArea className="max-h-[80vh] p-3">
                    <AlertDialogHeader className="m-1">
                        <AlertDialogTitle>Tambah Rekomendasi</AlertDialogTitle>
                        <div className="divider my-1"></div>
                        <AlertDialogDescription>
                            <div>
                                <p className="text-sm mb-1">Tipe</p>
                                <Tabs
                                    defaultValue="standar"
                                    // className="w-[400px]"
                                    value={activeTab}
                                    onValueChange={onTabChange}
                                >
                                    <TabsList>
                                        <TabsTrigger value="standar">
                                            Standar
                                        </TabsTrigger>
                                        <TabsTrigger value="durasi">
                                            Durasi
                                        </TabsTrigger>
                                        <TabsTrigger value="repetisi">
                                            Repetisi
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="standar">
                                        <StandardRecomendation />
                                    </TabsContent>
                                    <TabsContent value="durasi">
                                        <DurationRecomendation />
                                    </TabsContent>
                                    <TabsContent value="repetisi">
                                        <RepetitionRecomendation />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant={"default"}
                                onClick={() => addRecomendationButton()}
                                disabled={true}
                            >
                                Tambah
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
};
