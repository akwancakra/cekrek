import { Child } from "./children.types";

export type BirthHistory = {
    id: number;
    child_id: number;
    healthy_pregnancy?: string;
    pregnancy_illness?: string;
    gestation_details?: string;
    birthplace?: string;
    birth_assistance?: string;
    delivery_process?: string;
    congenital_anomalies?: string;
    first_food?: string;
    formula_milk?: string;
    immunization?: string;
    child?: Child;
};
