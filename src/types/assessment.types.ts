import { ChildAssesment } from "./childAssesment.type";

export type Assessment = {
    id: number;
    assesment_number: number;
    question: string;
    picture?: string;
    child_assesments?: ChildAssesment[];
};
