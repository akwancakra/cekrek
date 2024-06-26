import { ChildAssesment } from "@/types/childAssesment.type";

const getScoreAssessments = (childAssesment: ChildAssesment[]) => {
    const totalLulus = childAssesment.filter(
        (assessment) => assessment.answer === "Lulus"
    ).length;
    const totalGagal = childAssesment.filter(
        (assessment) => assessment.answer === "Gagal"
    ).length;

    let risk_category: "Rendah" | "Sedang" | "Tinggi" = "Rendah";
    if (totalGagal >= 0 && totalGagal <= 2) {
        risk_category = "Rendah";
    } else if (totalGagal >= 3 && totalGagal <= 7) {
        risk_category = "Sedang";
    } else if (totalGagal >= 8 && totalGagal <= 20) {
        risk_category = "Tinggi";
    }

    return `${totalLulus}/${totalGagal}`;
};

const getRiskCategory = (childAssesment: ChildAssesment[]) => {
    const totalGagal = childAssesment.filter(
        (assessment) => assessment.answer === "Gagal"
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

export { getScoreAssessments, getRiskCategory };
