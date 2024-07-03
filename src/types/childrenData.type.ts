export interface ChildrenData {
    biodata: {
        teacher_id?: string;
        risk_category: string;
        parent_dad: string;
        parent_mother: string;
        parent_wali: string;
        full_name: string;
        nick_name: string;
        gender: string;
        religion: string;
        place_birth: string;
        date_birth: string;
        hearing: string;
        count_of_siblings: number;
        picture: any;
    };
    birthHistory: {
        healthy_pregnancy: string;
        pregnancy_illness: string;
        gestation_details: string;
        birthplace: string;
        birth_assistance: string;
        delivery_process: string;
        congenital_anomalies: string;
        first_food: string;
        formula_milk: string;
        immunization: string;
    };
    expertExamination: {
        pediatrician: string;
        rehabilitation: string;
        psychologist: string;
        therapist: string;
    };
    healthStatus: {
        serious_illness: string;
        current_diseases: string;
        treatment_location: string;
        treatment_duration: string;
        general_comparison: string;
        crawling_development: string;
        sitting_development: string;
        walking_development: string;
        first_words_age: string;
        speaking_fluency_age: string;
        bedwetting: string;
    };
}
