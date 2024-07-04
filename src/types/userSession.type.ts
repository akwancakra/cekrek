export type UserSession = {
    expires: Date | string;
    user: {
        id: any;
        email: string;
        name: string;
        role: string;
        type?: string;
        isGoogle?: boolean;
    };
};

export type Session = {
    id: any;
    email: string;
    name: string;
    role: string;
    type?: string;
    isGoogle?: boolean;
};
