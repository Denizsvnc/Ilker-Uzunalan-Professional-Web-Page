import axiosInstance from "../lib/axios";

export interface Project {
    id: string;
    cover_img_url: string;
    title_tr: string;
    title_en: string;
    description_tr: string;
    description_en: string;
    button_title_tr: string;
    button_title_en: string;
    button_url: string;
    url: string;
}

export const projectService = {
    getAllProjects: async (): Promise<Project[]> => {
        const { data } = await axiosInstance.get<Project[]>("/api/projects");
        return data;
    },
    createProject: async (projectData: Partial<Project>): Promise<Project> => {
        const { data } = await axiosInstance.post<Project>("/api/projects", projectData);
        return data;
    },
    getProjectById: async (id: string): Promise<Project> => {
        const { data } = await axiosInstance.get<Project>(`/api/projects/${id}`);
        return data;
    },
    updateProject: async (id: string, updatedData: Partial<Project>): Promise<Project> => {
        const { data } = await axiosInstance.put<Project>(`/api/projects/${id}`, updatedData);
        return data;
    },
    deleteProject: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/projects/${id}`);
    }
}