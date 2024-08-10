import { BirthHistory } from "./birthHistory.type";
import { ChildAssesment } from "./childAssesment.type";
import { ChildRecommendation } from "./childRecommendation.type";
import { ExpertExamination } from "./expertExamination.type";
import { HealthStatus } from "./healthStatus.type";
// import { MonitorChildRecommendation } from "./monitorChildRecommendation.type";
import { Recommendation } from "./recommendation.type";
import { User } from "./user.types";

export type Child = {
    id: number;
    full_name: string;
    teacher_id?: number;
    nick_name?: string;
    picture?: string;
    gender: string;
    place_birth?: string;
    date_time_birth?: Date | string;
    religion?: string;
    count_of_siblings?: number;
    risk_category?: "rendah" | "sedang" | "tinggi";
    hearing_test:
        | "pendengaran dalam batas normal"
        | "pendengaran di bawah normal"
        | "hasil tidak menyakinkan atau tidak definitif";
    teacher?: User[];
    parent?: User[];
    child_recommendations?: ChildRecommendation[];
    // monitoringChildRecommendations?: MonitorRecommendationWrap[];
    monitor_child_recommendation?: MonitorRecommendationWrap[];
    birth_history?: BirthHistory;
    expert_examination?: ExpertExamination;
    health_status?: HealthStatus;
    child_assesments?: AssesmentWrap[];
    totalRecommendation?: number;
    finishedRecommendations?: boolean;
    unfinishedRecommendations?: boolean;
    last_assesment_date?: string;
};

export type AssesmentWrap = {
    date_time: Date | string;
    assesments: ChildAssesment[];
};

// type RecommendationWrap = {
//     date_time: Date;
//     recommendations: ChildRecommendation[];
// };

export type MonitorRecommendationWrap = {
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
