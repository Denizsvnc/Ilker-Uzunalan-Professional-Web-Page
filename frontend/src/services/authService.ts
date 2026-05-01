import axiosInstance from "../lib/axios";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
        const { data } = await axiosInstance.post<LoginResponse>("/api/auth/login", credentials);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    },
    logout: async (): Promise<void> => {
        await axiosInstance.post("/api/auth/logout");
        localStorage.removeItem("token");
    },
    getMe: async (): Promise<User> => {
        const { data } = await axiosInstance.get<User>("/api/auth/me");
        return data;
    }
};
