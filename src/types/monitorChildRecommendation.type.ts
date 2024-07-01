import { ChildRecommendation } from "./childRecommendation.type";

export type MonitorChildRecommendation = {
    id: number;
    child_recommendation_id: number;
    date_time: Date;
    is_done: boolean;
    child_recommendation?: ChildRecommendation;
};
