import { Child } from "./children.types";

export type User = {
    id: number;
    email: string;
    password: string;
    role: "admin" | "teacher" | "parent";
    name: string;
    type?: "ayah" | "ibu" | "wali";
    place_birth?: string;
    date_time_birth?: Date;
    religion?: string;
    education?: string;
    job?: string;
    address?: string;
    phone?: string;
    is_google: boolean;
    created_at: Date;
    updated_at: Date;
    children?: Child[];
};
