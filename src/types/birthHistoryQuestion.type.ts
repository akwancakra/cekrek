export type BirthHistoryQuestion = {
    id: number;
    type: "sebelum kelahiran" | "saat kelahiran";
    question: string;
    example_answer?: string;
};
