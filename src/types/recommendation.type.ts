import { ChildRecommendation } from "./childRecommendation.type";

export type Recommendation = {
    id: number;
    teacher_id?: number;
    assesment_number: number;
    aspect: string;
    is_main: boolean;
    title: string;
    description: string;
    icon?: string;
    frequency?: string;
    risk_category?: "rendah" | "sedang" | "tinggi";
    children?: ChildRecommendation[];
    isFinished?: boolean;
};
