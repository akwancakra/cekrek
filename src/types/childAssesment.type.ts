import { Assessment } from "./assessment.types";
import { Child } from "./children.types";

export type ChildAssesment = {
    id: number;
    children_id: number;
    assesment_id: number;
    answer: string;
    date_time: Date;
    children?: Child;
    assesments?: Assessment;
};
