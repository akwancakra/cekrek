import { Teacher } from "./teacher.types";

export type User = {
    id: number;
    email: string;
    password?: string;
    createdAt: string;
    updatedAt?: string;
    teacher?: Teacher;
};
