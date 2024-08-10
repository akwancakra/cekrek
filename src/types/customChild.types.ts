import { Recommendation } from "./recommendation.type";

export type ChildRecommendation = {
    id: number;
    children_id: number;
    recommendation_id: number;
    recommendations: Recommendation;
    isFinished?: boolean;
    isFinishedByParent?: boolean;
    isFinishedByTeacher?: boolean;
};

export type Child = {
    id: number;
    full_name: string;
    teacher_id: number;
    nick_name: string | null;
    picture: string | null;
    gender: string;
    place_birth: string;
    date_time_birth: string;
    religion: string;
    count_of_siblings: number;
    risk_category: string;
    hearing_test: string;
    child_recommendations: ChildRecommendation[];
    monitor_child_recommendation: {
        id: number;
        child_recommendation_id: number;
        date_time: string;
        is_done: boolean;
        with_whom: string;
        child_recommendations: ChildRecommendation;
        recommendations: RecommendationWrapper[];
    }[];
    finishedRecommendations?: number;
    unfinishedRecommendations?: number;
    finishedRecommendationsByTeacher?: number;
    unfinishedRecommendationsByTeacher?: number;
    finishedRecommendationsByParent?: number;
    unfinishedRecommendationsByParent?: number;
    last_assesment_date?: string;
};

type RecommendationWrapper = {
    id: number;
    recommendation: Recommendation;
};
