export type ProcessedAssessment = {
    child_id: string;
    nama: string;
    score: string;
    date_time: string;
    risk_category: "Rendah" | "Sedang" | "Tinggi";
    type: "awal" | "follow up";
};
