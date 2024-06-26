import { Child } from "./children.types";

export type ExpertExamination = {
    id: number;
    child_id: number;
    pediatrician?: string;
    rehabilitation?: string;
    psychologist?: string;
    therapist?: string;
    child?: Child;
};
