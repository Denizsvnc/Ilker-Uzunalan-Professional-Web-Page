import axiosInstance from "../lib/axios";

export interface Hero {
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
export const heroService = {
    getAllHero: async (): Promise<Hero[]> => {
        const response = await axiosInstance.get<Hero[]>("/api/hero/all");
        return response.data;
    },
    createHero: async (heroData: Partial<Hero>): Promise<Hero> => {
        const { data } = await axiosInstance.post<Hero>("/api/hero/add", heroData);
        return data;
    },
    updateHero: async (id: string, updatedData: Partial<Hero>): Promise<Hero> => {
        const { data } = await axiosInstance.put<Hero>(`/api/hero/update/${id}`, updatedData);
        return data;
    },
    deleteHero: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/hero/delete/${id}`);
    }
}