import { Teacher } from "./teacher.types";

export type User = {
    id: string;
    email: string;
    password?: string;
    createdAt: string;
    updatedAt?: string;
    teacher?: Teacher;
};
