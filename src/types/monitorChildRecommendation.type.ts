import { ChildRecommendation } from "./childRecommendation.type";
import { Recommendation } from "./recommendation.type";

export type MonitorChildRecommendation = {
    id: number;
    name: string;
    child_recommendation_id: number;
    date_time: Date;
    is_done: boolean;
    with_whom: string;
    child_recommendations: {
        id: number;
        children_id: number;
        recommendation_id: number;
    };
    recommendations: RecommendationWrapper[];
};

type RecommendationWrapper = {
    id: number;
    recommendation: Recommendation;
};
