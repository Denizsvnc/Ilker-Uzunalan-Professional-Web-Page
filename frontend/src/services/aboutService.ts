import axiosInstance from "../lib/axios";

export interface About {
    id: string;
    img_url: string;
    title_tr: string;
    title_en: string;
    description_tr: string;
    description_en: string;
    button_title_tr: string;
    button_title_en: string;
    button_url: string;
}

export const aboutService = {
    getAboutUs: async (): Promise<About[]> => {
        const { data } = await axiosInstance.get<About[]>("/api/aboutUs/aboutUs");
        return data;
    },
    createAboutUs: async (aboutData: Partial<About>): Promise<About> => {
        const { data } = await axiosInstance.post<About>("/api/aboutUs/create", aboutData);
        return data;
    },
    updateAboutUs: async (id: string, updatedData: Partial<About>): Promise<About> => {
        const { data } = await axiosInstance.put<About>(`/api/aboutUs/update/${id}`, updatedData);
        return data;
    },
    deleteAboutUs: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/aboutUs/delete/${id}`);
    }
};