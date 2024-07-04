"use client";

import { useEffect, useState } from "react";
import BiodataWrapper from "@/components/elements/child-add/BiodataWrapper";
import BirthWrapper from "@/components/elements/child-add/BirthWrapper";
import ExpertWrapper from "@/components/elements/child-add/ExpertWrapper";
import HealthWrapper from "@/components/elements/child-add/HealthWrapper";
import { useLocalStorage } from "usehooks-ts";
import PreviewData from "@/components/elements/child-add/PreviewData";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Child } from "@/types/children.types";
import useProfile from "@/utils/useProfile";

export interface ChildrenData {
    biodata: {
        // id: string;
        risk_category: string;
        parent_dad: string;
        parent_mother: string;
        parent_wali: string;
        full_name: string;
        nick_name: string;
        gender: string;
        religion: string;
        place_birth: string;
        date_birth: string;
        hearing: string;
        count_of_siblings: number;
        picture: any;
    };
    birthHistory: {
        healthy_pregnancy: string;
        pregnancy_illness: string;
        gestation_details: string;
        birthplace: string;
        birth_assistance: string;
        delivery_process: string;
        congenital_anomalies: string;
        first_food: string;
        formula_milk: string;
        immunization: string;
    };
    expertExamination: {
        pediatrician: string;
        rehabilitation: string;
        psychologist: string;
        therapist: string;
    };
    healthStatus: {
        serious_illness: string;
        current_diseases: string;
        treatment_location: string;
        treatment_duration: string;
        general_comparison: string;
        crawling_development: string;
        sitting_development: string;
        walking_development: string;
        first_words_age: string;
        speaking_fluency_age: string;
        bedwetting: string;
    };
}

const getImageUrl = (image: any) => {
    if (image instanceof File) {
        return URL.createObjectURL(image);
    } else if (typeof image === "string" && image.startsWith("data:image")) {
        return image; // This handles base64 images directly
    } else if (typeof image === "string" && image) {
        return `/uploads/children/${image}`;
    } else {
        return "/static/images/user-default.jpg";
    }
};

export default function AddStudentPage() {
    const [currentStage, setCurrentStage] = useState(1);
    // const [isLoading, setIsLoading] = useState(false);
    const [value, setValue, removeValue] = useLocalStorage<ChildrenData>(
        "children-data-edit",
        {} as ChildrenData
    );
    const profile = useProfile();

    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();

    const {
        data,
        isLoading,
    }: {
        data: { status: string; child: Child };
        isLoading: boolean;
    } = useSWR(`/api/teachers/${profile?.id}/students/${id}`, fetcher);

    const stages = ["biodata", "birth-history", "expert", "health", "preview"];

    const handleNextStage = () => {
        if (currentStage !== 5) {
            const nextStageIndex = currentStage + 1;
            if (nextStageIndex <= stages.length) {
                setCurrentStage(nextStageIndex);
                router.push(
                    `/t/students/${id}/edit?stage=${stages[nextStageIndex - 1]}`
                );
            }
        }
    };

    const handleBackStage = () => {
        if (currentStage !== 1) {
            const previousStageIndex = currentStage - 1;
            if (previousStageIndex > 0) {
                setCurrentStage(previousStageIndex);
                router.push(
                    `/t/students/${id}/edit?stage=${
                        stages[previousStageIndex - 1]
                    }`
                );
            }
        }
    };

    const handleStageClick = (stageIndex: number) => {
        if (validateStage(stageIndex - 1)) {
            setCurrentStage(stageIndex);
            router.push(
                `/t/students/${id}/edit?stage=${stages[stageIndex - 1]}`
            );
        } else {
            toast.error("Lengkapi data pada step sebelumnya.");
        }
    };

    const handleResetValues = ({ push }: { push?: boolean }) => {
        removeValue();
        if (push) {
            router.push("/t");
        }
    };

    const saveAllAnswers = (
        section: keyof ChildrenData,
        newData: Partial<ChildrenData[keyof ChildrenData]>
    ) => {
        // Retrieve current data
        const currentData = value || ({} as ChildrenData);

        // Update the specified section with new data
        const updatedData = {
            ...currentData,
            [section]: { ...currentData[section], ...newData },
        };

        // Save the updated data back to local storage
        setValue(updatedData);
    };

    const validateStage = (stageIndex: number) => {
        const data = value || ({} as ChildrenData);

        // Helper functions to validate each stage
        const validateBiodata = () => {
            const biodata = data.biodata || ({} as any);
            return (
                biodata.full_name &&
                biodata.gender &&
                biodata.religion &&
                biodata.place_birth &&
                biodata.date_birth
            );
        };

        const validateBirthHistory = () => {
            const birthHistory = data.birthHistory || ({} as any);
            return Object.values(birthHistory).every((value) => value !== "");
        };

        const validateExpertExamination = () => {
            const expertExamination = data.expertExamination || ({} as any);
            return Object.values(expertExamination).every(
                (value) => value !== ""
            );
        };

        const validateHealthStatus = () => {
            const healthStatus = data.healthStatus || ({} as any);
            return (
                healthStatus.serious_illness &&
                healthStatus.treatment_location &&
                healthStatus.treatment_duration &&
                healthStatus.general_comparison &&
                healthStatus.crawling_development &&
                healthStatus.sitting_development &&
                healthStatus.walking_development &&
                healthStatus.first_words_age &&
                healthStatus.speaking_fluency_age &&
                healthStatus.bedwetting
            );
        };

        // Validate all stages up to the current stageIndex
        switch (stageIndex) {
            case 1:
                return validateBiodata();
            case 2:
                return validateBiodata() && validateBirthHistory();
            case 3:
                return (
                    validateBiodata() &&
                    validateBirthHistory() &&
                    validateExpertExamination()
                );
            case 4:
                return (
                    validateBiodata() &&
                    validateBirthHistory() &&
                    validateExpertExamination() &&
                    validateHealthStatus()
                );
            default:
                return true;
        }
    };

    // useEffect(() => {
    //     removeValue();
    // }, []);

    const findIncompleteStage = () => {
        for (let i = 1; i <= stages.length; i++) {
            if (!validateStage(i)) {
                return i;
            }
        }
        return stages.length;
    };

    useEffect(() => {
        // removeValue();
        const stageParam = searchParams.get("stage");
        let initialStageIndex = 1;

        if (stageParam) {
            const stageIndex = stages.indexOf(stageParam) + 1;
            if (stageIndex > 0) {
                initialStageIndex = stageIndex;
            }
        }

        const incompleteStageIndex = findIncompleteStage();
        const stageToSet = Math.min(initialStageIndex, incompleteStageIndex);
        setCurrentStage(stageToSet);
        router.replace(
            `/t/students/${id}/edit?stage=${stages[stageToSet - 1]}`
        );
    }, [id]);

    useEffect(() => {
        console.log("Main: ", data);
        const childData = data?.child;
        if (childData) {
            removeValue();

            console.log(value);

            const biodata = {
                id: childData.id.toString(),
                risk_category: childData.risk_category || "",
                parent_dad:
                    childData.parent
                        ?.find((parent) => parent.type === "ayah")
                        ?.id?.toString() || "",
                parent_mother:
                    childData.parent
                        ?.find((parent) => parent.type === "ibu")
                        ?.id?.toString() || "",
                parent_wali:
                    childData.parent
                        ?.find((parent) => parent.type === "wali")
                        ?.id?.toString() || "",
                full_name: childData.full_name || "",
                nick_name: childData.nick_name || "",
                gender: childData.gender || "",
                religion: childData.religion || "",
                place_birth: childData.place_birth || "",
                date_birth: childData.date_time_birth
                    ? new Date(childData.date_time_birth).toISOString()
                    : "",
                hearing: childData.hearing_test || "",
                count_of_siblings: childData.count_of_siblings || 0,
                picture: childData.picture || null,
            };

            const birthHistory = {
                healthy_pregnancy:
                    childData.birth_history?.healthy_pregnancy || "",
                pregnancy_illness:
                    childData.birth_history?.pregnancy_illness || "",
                gestation_details:
                    childData.birth_history?.gestation_details || "",
                birthplace: childData.birth_history?.birthplace || "",
                birth_assistance:
                    childData.birth_history?.birth_assistance || "",
                delivery_process:
                    childData.birth_history?.delivery_process || "",
                congenital_anomalies:
                    childData.birth_history?.congenital_anomalies || "",
                first_food: childData.birth_history?.first_food || "",
                formula_milk: childData.birth_history?.formula_milk || "",
                immunization: childData.birth_history?.immunization || "",
            };

            const expertExamination = {
                pediatrician: childData.expert_examination?.pediatrician || "",
                rehabilitation:
                    childData.expert_examination?.rehabilitation || "",
                psychologist: childData.expert_examination?.psychologist || "",
                therapist: childData.expert_examination?.therapist || "",
            };

            const healthStatus = {
                serious_illness: childData.health_status?.serious_illness || "",
                current_diseases:
                    childData.health_status?.current_diseases || "",
                treatment_location:
                    childData.health_status?.treatment_location || "",
                treatment_duration:
                    childData.health_status?.treatment_duration || "",
                general_comparison:
                    childData.health_status?.general_comparison || "",
                crawling_development:
                    childData.health_status?.crawling_development || "",
                sitting_development:
                    childData.health_status?.sitting_development || "",
                walking_development:
                    childData.health_status?.walking_development || "",
                first_words_age: childData.health_status?.first_words_age || "",
                speaking_fluency_age:
                    childData.health_status?.speaking_fluency_age || "",
                bedwetting: childData.health_status?.bedwetting || "",
            };

            setValue({
                biodata,
                birthHistory,
                expertExamination,
                healthStatus,
            });

            console.log("Value: ", value);
        }
    }, [data?.child]);

    // useEffect(() => {
    //     mutate();
    // }, []);

    if (!data?.child || isLoading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="flex items-center gap-1">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Memuat data...</span>
                </div>
            </div>
        );
    }

    const getStageComponent = () => {
        switch (currentStage) {
            case 1:
                return (
                    <BiodataWrapper
                        // handleBackStage={handleBackStage}
                        handleNextStage={handleNextStage}
                        saveAllAnswers={saveAllAnswers}
                        localData={value}
                    />
                );
            case 2:
                return (
                    <BirthWrapper
                        handleBackStage={handleBackStage}
                        handleNextStage={handleNextStage}
                        saveAllAnswers={saveAllAnswers}
                        localData={value}
                    />
                );
            case 3:
                return (
                    <ExpertWrapper
                        handleBackStage={handleBackStage}
                        handleNextStage={handleNextStage}
                        saveAllAnswers={saveAllAnswers}
                        localData={value}
                    />
                );
            case 4:
                return (
                    <HealthWrapper
                        handleBackStage={handleBackStage}
                        handleNextStage={handleNextStage}
                        saveAllAnswers={saveAllAnswers}
                        localData={value}
                    />
                );
            case 5:
                return (
                    <PreviewData
                        handleBackStage={handleBackStage}
                        resetLocal={handleResetValues}
                        localData={value}
                    />
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <section className="mx-auto max-w-7xl">
                <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
                    Ubah siswa {value?.biodata?.full_name}
                </p>
                <div className="divider my-1"></div>

                <div className="flex justify-center mb-3">
                    <ul className="steps w-full">
                        <li
                            className={`cursor-pointer text-small before:!h-1 step ${
                                currentStage > 1 ? "step-primary" : ""
                            }`}
                            data-content={currentStage > 1 ? "✓" : "1"}
                            onClick={() => handleStageClick(1)}
                        >
                            Biodata
                        </li>
                        <li
                            className={`cursor-pointer text-small before:!h-1 step ${
                                currentStage > 2 ? "step-primary" : ""
                            }`}
                            data-content={currentStage > 2 ? "✓" : "2"}
                            onClick={() => handleStageClick(2)}
                        >
                            Kelahiran
                        </li>
                        <li
                            className={`cursor-pointer text-small before:!h-1 step ${
                                currentStage > 3 ? "step-primary" : ""
                            }`}
                            data-content={currentStage > 3 ? "✓" : "3"}
                            onClick={() => handleStageClick(3)}
                        >
                            Hasil Ahli
                        </li>
                        <li
                            className={`cursor-pointer text-small before:!h-1 step ${
                                currentStage > 4 ? "step-primary" : ""
                            }`}
                            data-content={currentStage > 4 ? "✓" : "4"}
                            onClick={() => handleStageClick(4)}
                        >
                            Kesehatan
                        </li>
                    </ul>
                </div>

                <div className="sm:flex group-[.open]:block md;group-[.open]:flex">
                    <div className=" w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                        {getStageComponent()}
                    </div>
                    <div className="sticky top-4 rounded-lg p-2 bg-white border border-gray-300 w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3">
                        <div className="max-w-32 mb-3 bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={getImageUrl(value?.biodata?.picture)}
                                    alt="Child Profile"
                                    fill={true}
                                    className="rounded-lg object-cover"
                                    draggable={false}
                                />
                            </AspectRatio>
                        </div>
                        <div className="grid gap-2 gap-y-2 mb-3 sm:grid-cols-2 md:group-[.open]:grid-cols-2">
                            <div>
                                <p className="text-xs to-gray-400">Nama</p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.full_name || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Nama Panggilan
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.nick_name || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Jenis Kelamin
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.gender
                                        ? capitalizeFirstLetter(
                                              value.biodata.gender
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">Agama</p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.religion
                                        ? capitalizeFirstLetter(
                                              value.biodata.religion
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Tempat Lahir
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.place_birth || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Tanggal Lahir
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.date_birth
                                        ? formattedDate(
                                              value.biodata.date_birth
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Pendengaran
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.hearing
                                        ? capitalizeFirstLetter(
                                              value.biodata.hearing
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs to-gray-400">
                                    Jumlah Saudara
                                </p>
                                <p className="text-medium font-semibold">
                                    {value?.biodata?.count_of_siblings || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
