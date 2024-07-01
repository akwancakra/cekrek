export type HealthStatusQuestion = {
    id: number;
    type: "keadaan kesehatan" | "perkembangan jasmani";
    question: string;
    example_answer?: string;
};
