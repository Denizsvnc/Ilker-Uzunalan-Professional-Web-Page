import axiosInstance from "../lib/axios";

export interface MyInfo {
    id: string;
    pp_url: string;
    phone_number: string;
    email: string;
    linkedin_url: string;
    instagram_url: string;
    youtube_url: string;
}

export const myInfoService = {
    getMyInfo: async (): Promise<MyInfo[]> => {
        const { data } = await axiosInstance.get<MyInfo[]>("/api/info/myinfo");
        return data;
    },
    createMyInfo: async (infoData: Partial<MyInfo>): Promise<MyInfo> => {
        const { data } = await axiosInstance.post<MyInfo>("/api/info/add", infoData);
        return data;
    },
    updateMyInfo: async (id: string, updatedData: Partial<MyInfo>): Promise<MyInfo> => {
        const { data } = await axiosInstance.put<MyInfo>(`/api/info/update/${id}`, updatedData);
        return data;
    },
    deleteMyInfo: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/info/delete/${id}`);
    }
};
