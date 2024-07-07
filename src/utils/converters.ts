import { AssessmentAnswer } from "@/types/assessmentAnswer.copy";
import { ChildAssesment } from "@/types/childAssesment.type";
import { AssesmentWrap, Child } from "@/types/children.types";
import { ProcessedAssessment } from "@/types/processedAssessments.type";

const processMultiChildAssessments = (
    childs: Child[]
): ProcessedAssessment[] => {
    const processedAssessments: ProcessedAssessment[] = [];

    // Iterate through each child
    childs.forEach((child) => {
        const childAssessments = child.child_assesments?.filter(
            (chass) => chass.assesments && chass.assesments.length > 0
        );

        if (childAssessments) {
            // Group assessments by date_time
            const assessmentsByDate: { [key: string]: AssesmentWrap[] } = {};

            childAssessments.forEach((chass) => {
                const dateKey = chass.date_time.toString();
                if (!assessmentsByDate[dateKey]) {
                    assessmentsByDate[dateKey] = [];
                }
                assessmentsByDate[dateKey].push(chass);
            });

            // Process each date group
            Object.keys(assessmentsByDate).forEach((dateKey) => {
                const assessmentsForDate = assessmentsByDate[dateKey];

                // Process assessments for each assessment type ("awal" and "follow up")
                const assessmentTypes = ["awal", "follow up"];

                assessmentTypes.forEach((type) => {
                    // Filter assessments based on type and answer criteria
                    const filteredAssessments = assessmentsForDate.flatMap(
                        (chass) =>
                            chass.assesments.filter(
                                (assesment) => assesment.assesment_type === type
                            )
                    );

                    // Calculate totalLulus and totalGagal based on filtered assessments
                    const totalLulus = filteredAssessments.filter(
                        (assesment) =>
                            (type === "awal" && assesment.answer === "ya") ||
                            (type === "follow up" &&
                                assesment.answer === "lulus")
                    ).length;

                    const totalGagal = filteredAssessments.filter(
                        (assesment) =>
                            (type === "awal" && assesment.answer === "tidak") ||
                            (type === "follow up" &&
                                assesment.answer === "gagal")
                    ).length;

                    // Check if there are assessments for the current type
                    if (totalLulus > 0 || totalGagal > 0) {
                        // Determine risk category based on totalGagal (assuming gagal for "follow up")
                        let risk_category: "Rendah" | "Sedang" | "Tinggi" =
                            "Rendah";
                        if (totalGagal >= 0 && totalGagal <= 2) {
                            risk_category = "Rendah";
                        } else if (totalGagal >= 3 && totalGagal <= 7) {
                            risk_category = "Sedang";
                        } else if (totalGagal >= 8 && totalGagal <= 20) {
                            risk_category = "Tinggi";
                        }

                        // Create and add processed assessment object
                        processedAssessments.push({
                            child_id: child.id.toString(),
                            nama: child.full_name,
                            date_time: dateKey,
                            risk_category,
                            score: `${totalLulus}/${totalGagal}`,
                            type: type as "awal" | "follow up",
                        });
                    }
                });
            });
        }
    });

    return processedAssessments;
};

// Child
const processChildAssessments = (child: any): ProcessedAssessment[] => {
    const processedAssessments: ProcessedAssessment[] = [];

    // Iterate through each child
    const childAssessments = child.child_assesments?.filter(
        (chass) => chass.assesments && chass.assesments.length > 0
    );

    if (childAssessments) {
        // Group assessments by date_time
        const assessmentsByDate: { [key: string]: AssesmentWrap[] } = {};

        childAssessments.forEach((chass) => {
            const dateKey = chass.date_time.toString();
            if (!assessmentsByDate[dateKey]) {
                assessmentsByDate[dateKey] = [];
            }
            assessmentsByDate[dateKey].push(chass);
        });

        // Process each date group
        Object.keys(assessmentsByDate).forEach((dateKey) => {
            const assessmentsForDate = assessmentsByDate[dateKey];

            // Process assessments for each assessment type ("awal" and "follow up")
            const assessmentTypes = ["awal", "follow up"];

            assessmentTypes.forEach((type) => {
                // Filter assessments based on type and answer criteria
                const filteredAssessments = assessmentsForDate.flatMap(
                    (chass) =>
                        chass.assesments.filter(
                            (assesment) => assesment.assesment_type === type
                        )
                );

                // Calculate totalLulus and totalGagal based on filtered assessments
                const totalLulus = filteredAssessments.filter(
                    (assesment) =>
                        (type === "awal" && assesment.answer === "ya") ||
                        (type === "follow up" && assesment.answer === "lulus")
                ).length;

                const totalGagal = filteredAssessments.filter(
                    (assesment) =>
                        (type === "awal" && assesment.answer === "tidak") ||
                        (type === "follow up" && assesment.answer === "gagal")
                ).length;

                // Check if there are assessments for the current type
                if (totalLulus > 0 || totalGagal > 0) {
                    // Determine risk category based on totalGagal (assuming gagal for "follow up")
                    let risk_category: "Rendah" | "Sedang" | "Tinggi" =
                        "Rendah";
                    if (totalGagal >= 0 && totalGagal <= 2) {
                        risk_category = "Rendah";
                    } else if (totalGagal >= 3 && totalGagal <= 7) {
                        risk_category = "Sedang";
                    } else if (totalGagal >= 8 && totalGagal <= 20) {
                        risk_category = "Tinggi";
                    }

                    // Create and add processed assessment object
                    processedAssessments.push({
                        child_id: child.id.toString(),
                        nama: child.full_name,
                        date_time: dateKey,
                        risk_category,
                        score: `${totalLulus}/${totalGagal}`,
                        type: type as "awal" | "follow up",
                    });
                }
            });
        });
    }

    return processedAssessments;
};

// Child
const generateAssessmentWrap = (child: any): AssesmentWrap[] => {
    const assessmentsByDate: any = {}; //{ [key: string]: AssesmentWrap[] }

    if (child.child_assesments) {
        child.child_assesments.forEach((assessment) => {
            const dateKey = new Date(assessment.date_time)
                .toISOString()
                .split("T")[0];
            if (!assessmentsByDate[dateKey]) {
                assessmentsByDate[dateKey] = [];
            }
            assessmentsByDate[dateKey].push(assessment);
        });

        return Object.keys(assessmentsByDate).map((date) => ({
            date_time: new Date(date),
            assesments: assessmentsByDate[date],
        }));
    }

    return [];
};

const getScoreAssessments = ({
    childAssesment,
    type,
}: {
    childAssesment: ChildAssesment[] | AssessmentAnswer[];
    type: "awal" | "follow up";
}) => {
    const totalLulus = childAssesment.filter(
        (assessment) => assessment.answer === (type === "awal" ? "ya" : "lulus")
    ).length;
    const totalGagal = childAssesment.filter(
        (assessment) =>
            assessment.answer === (type === "awal" ? "tidak" : "gagal")
    ).length;

    return `${totalLulus}/${totalGagal}`;
};

const getRiskCategory = ({
    childAssesment,
    type,
}: {
    childAssesment: ChildAssesment[] | AssessmentAnswer[];
    type: "awal" | "follow up";
}) => {
    const totalGagal = childAssesment.filter(
        (assessment) =>
            assessment.answer === (type === "awal" ? "tidak" : "gagal")
    ).length;

    let risk_category: "Rendah" | "Sedang" | "Tinggi" = "Rendah";
    if (totalGagal >= 0 && totalGagal <= 2) {
        risk_category = "Rendah";
    } else if (totalGagal >= 3 && totalGagal <= 7) {
        risk_category = "Sedang";
    } else if (totalGagal >= 8 && totalGagal <= 20) {
        risk_category = "Tinggi";
    }

    return risk_category;
};

const truncateString = (str: string, maxLength: number = 25): string => {
    if (str.length <= maxLength) {
        return str;
    }

    return str.substring(0, maxLength) + "...";
};

const getVariant = (category: string) => {
    switch (category.toLowerCase()) {
        case "rendah":
            return "bg-yellow-600 text-white hover:bg-yellow-700";
        case "sedang":
            return "bg-primary text-white hover:bg-primary";
        case "tinggi":
            return "bg-red-600 text-white hover:bg-red-700";
        default:
            return "";
    }
};

const removeLeadingZeros = (input: string) => {
    let result = input;
    while (result.length > 1 && result[0] === "0") {
        result = result.substring(1);
    }
    return result;
};

const questionsBirthHealth = [
    "healthy_pregnancy",
    "pregnancy_illness",
    "gestation_details",
    "birthplace",
    "birth_assistance",
    "delivery_process",
    "congenital_anomalies",
    "first_food",
    "formula_milk",
    "immunization",
];

const getSubCurrentStage = (birthHistory) => {
    for (let i = 0; i < questionsBirthHealth.length; i++) {
        if (
            !birthHistory[questionsBirthHealth[i]] ||
            birthHistory[questionsBirthHealth[i]] === ""
        ) {
            return i + 1;
        }
    }
    return questionsBirthHealth.length;
};

const getUrlFromRole = (role: string) => {
    const url = [
        { role: "admin", url: "/a" },
        { role: "teacher", url: "/t" },
        { role: "parent", url: "/p" },
    ];

    return url.find((u) => u.role === role)?.url || "/";
};

const getImageUrl = (image?: any) => {
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

const getRecommendationImageUrl = (image?: any) => {
    if (image instanceof File) {
        return URL.createObjectURL(image);
    } else if (typeof image === "string" && image.startsWith("data:image")) {
        return image; // This handles base64 images directly
    } else if (typeof image === "string" && image) {
        return `/uploads/recommendations/${image}`;
    } else {
        return "/static/images/default.jpg";
    }
};

export {
    getScoreAssessments,
    getRiskCategory,
    processMultiChildAssessments,
    processChildAssessments,
    generateAssessmentWrap,
    getVariant,
    truncateString,
    removeLeadingZeros,
    getSubCurrentStage,
    questionsBirthHealth,
    getUrlFromRole,
    getImageUrl,
    getRecommendationImageUrl,
};
