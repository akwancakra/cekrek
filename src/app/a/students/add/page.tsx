"use client";

import { useEffect, useState } from "react";
import BiodataWrapper from "@/components/elements/child-add/admin/BiodataWrapper";
// import BirthWrapper from "@/components/elements/child-add/admin/BirthWrapper";
// import ExpertWrapper from "@/components/elements/child-add/admin/ExpertWrapper";
// import HealthWrapper from "@/components/elements/child-add/admin/HealthWrapper";
import PreviewData from "@/components/elements/child-add/admin/PreviewData";
import { useLocalStorage } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { capitalizeFirstLetter, formattedDate } from "@/utils/formattedDate";
import { toast } from "sonner";
import { ChildrenData } from "@/types/childrenData.type";
import BirthWrapper from "@/components/elements/child-add/BirthWrapper";
import ExpertWrapper from "@/components/elements/child-add/ExpertWrapper";
import HealthWrapper from "@/components/elements/child-add/HealthWrapper";

export default function AddStudentPage() {
    const [currentStage, setCurrentStage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue, removeValue] = useLocalStorage<ChildrenData>(
        "children-data-admin",
        {} as ChildrenData
    );
    const router = useRouter();
    const searchParams = useSearchParams();

    const stages = ["biodata", "birth-history", "expert", "health", "preview"];

    const getImageUrl = (image: any) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }
        return image || "/static/images/user-default.jpg";
    };

    const handleNextStage = () => {
        if (currentStage !== 5) {
            const nextStageIndex = currentStage + 1;
            if (nextStageIndex <= stages.length) {
                setCurrentStage(nextStageIndex);
                router.push(
                    `/a/students/add?stage=${stages[nextStageIndex - 1]}`
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
                    `/a/students/add?stage=${stages[previousStageIndex - 1]}`
                );
            }
        }
    };

    const handleResetValues = ({ push }: { push?: boolean }) => {
        if (push) {
            removeValue();
            router.push("/a/students");
        } else {
            removeValue();
        }
    };

    const handleStageClick = (stageIndex: number) => {
        if (validateStage(stageIndex - 1)) {
            setCurrentStage(stageIndex);
            router.push(`/a/students/add?stage=${stages[stageIndex - 1]}`);
        } else {
            toast.error("Lengkapi data pada step sebelumnya.");
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

    const findIncompleteStage = () => {
        for (let i = 1; i <= stages.length; i++) {
            if (!validateStage(i)) {
                return i;
            }
        }
        return stages.length;
    };

    useEffect(() => {
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
        router.replace(`/a/students/add?stage=${stages[stageToSet - 1]}`);
    }, []);

    const getStageComponent = () => {
        if (isLoading)
            return (
                <div className="flex min-h-screen justify-center items-center">
                    <div className="flex items-center gap-1">
                        <span className="loading loading-spinner loading-sm"></span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            );

        switch (currentStage) {
            case 1:
                return (
                    <BiodataWrapper
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
                    Tambah siswa
                </p>
                <div className="divider my-1 dark:after:!bg-neutral-600 dark:before:!bg-neutral-600"></div>

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

                <div className="sm:flex group-[.open]:block md:group-[.open]:flex">
                    <div className=" w-full sm:pe-3 sm:w-2/3 group-[.open]:pe-0 md:group-[.open]:pe-3 group-[.open]:w-full md:group-[.open]:w-2/3">
                        {getStageComponent()}
                    </div>
                    <div className="sticky top-4 rounded-lg p-2 bg-white border border-gray-300 w-full h-fit sm:w-1/3 mt-3 sm:mt-0 group-[.open]:mt-3 md:group-[.open]:mt-0 group-[.open]:w-full md:group-[.open]:w-1/3 dark:bg-neutral-800 dark:border-neutral-600">
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
                                <p className="text-xs text-gray-400">Nama</p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.full_name || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Nama Panggilan
                                </p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.nick_name || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Jenis Kelamin
                                </p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.gender
                                        ? capitalizeFirstLetter(
                                              value.biodata.gender
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Agama</p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.religion
                                        ? capitalizeFirstLetter(
                                              value.biodata.religion
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Tempat Lahir
                                </p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.place_birth || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Tanggal Lahir
                                </p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.date_birth
                                        ? formattedDate(
                                              value.biodata.date_birth
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Pendengaran
                                </p>
                                <p className="text-medium font-semibold break-words">
                                    {value?.biodata?.hearing
                                        ? capitalizeFirstLetter(
                                              value.biodata.hearing
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">
                                    Jumlah Saudara
                                </p>
                                <p className="text-medium font-semibold break-words">
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
