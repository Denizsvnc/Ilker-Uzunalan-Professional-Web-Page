import axiosInstance from "../lib/axios";

export interface Project {
    id: number;
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
        const { data } = await axiosInstance.get<Project[]>("/projects");
        return data;
    },
    createProject: async (projectData: Partial<Project>): Promise<Project> => {
        const { data } = await axiosInstance.post<Project>("/projects", projectData);
        return data;
    },
    getProjectById: async (id: number): Promise<Project> => {
        const { data } = await axiosInstance.get<Project>(`/projects/${id}`);
        return data;
    },
    updateProject: async (id: number, updatedData: Partial<Project>): Promise<Project> => {
        const { data } = await axiosInstance.put<Project>(`/projects/${id}`, updatedData);
        return data;
    },
    deleteProject: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/projects/${id}`);
    }
}