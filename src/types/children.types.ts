import { BirthHistory } from "./birthHistory.type";
import { ChildAssesment } from "./childAssesment.type";
import { ChildRecommendation } from "./childRecommendation.type";
import { ExpertExamination } from "./expertExamination.type";
import { HealthStatus } from "./healthStatus.type";
import { MonitorChildRecommendation } from "./monitorChildRecommendation.type";
import { User } from "./user.types";

export type Child = {
    id: number;
    full_name: string;
    teacher_id?: number;
    nick_name?: string;
    picture?: string;
    gender: string;
    place_birth?: string;
    date_time_birth?: Date;
    religion?: string;
    count_of_siblings?: number;
    risk_category?: "rendah" | "sedang" | "tinggi";
    hearing_test:
        | "pendengaran dalam batas normal"
        | "pendengaran di bawah normal"
        | "hasil tidak menyakinkan atau tidak definitif";
    parent?: User[];
    child_recommendations?: ChildRecommendation[];
    monitoringChildRecommendations?: MonitorRecommendationWrap[];
    birth_history?: BirthHistory;
    expert_examination?: ExpertExamination;
    health_status?: HealthStatus;
    child_assesments?: AssesmentWrap[];
};

export type AssesmentWrap = {
    date_time: Date;
    assesments: ChildAssesment[];
};

// type RecommendationWrap = {
//     date_time: Date;
//     recommendations: ChildRecommendation[];
// };

type MonitorRecommendationWrap = {
    date_time: Date;
    monitorRecommendations: MonitorChildRecommendation[];
};
