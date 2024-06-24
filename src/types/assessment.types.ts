export type Assessment = {
    id: string;
    title: string;
    description: string;
    category: "Low" | "Medium" | "High";
    createdAt: string;
};
