import { ChildRecommendation } from "./childRecommendation.type";

export type Recommendation = {
    id: number;
    assesment_number: number;
    is_main: boolean;
    title: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "rendah" | "sedang" | "tinggi";
    children?: ChildRecommendation[];
};
