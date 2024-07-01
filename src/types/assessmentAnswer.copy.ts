import { Assessment } from "./assessment.types";

export type AssessmentAnswer = {
    teacher_id: string;
    children_id: string;
    assesment_id: string;
    date_time: Date | string;
    assesment_type: string;
    answer: string;
    assesment?: Assessment;
    // assessmentsAnswer: AssessmentAnswerItem[];
};
