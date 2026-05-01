export interface AuthPayload {
    id: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}
