import { Child } from "./children.types";
import { MonitorChildRecommendation } from "./monitorChildRecommendation.type";
import { Recommendation } from "./recommendation.type";

export type ChildRecommendation = {
    id: number;
    children_id: number;
    recommendation_id: number;
    children?: Child;
    recommendations?: Recommendation;
    monitoringChildRecommendations?: MonitorChildRecommendation[];
};
