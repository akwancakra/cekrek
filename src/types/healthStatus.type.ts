import { Child } from "./children.types";

export type HealthStatus = {
    id: number;
    child_id: number;
    serious_illness?: string;
    current_diseases?: string;
    treatment_location?: string;
    treatment_duration?: string;
    general_comparison?: string;
    crawling_development?: string;
    sitting_development?: string;
    walking_development?: string;
    first_words_age?: string;
    speaking_fluency_age?: string;
    bedwetting?: string;
    child?: Child;
};
