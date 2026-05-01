import axiosInstance from "../lib/axios";

export interface Blog {
    id: string;
    cover_img_url: string;
    title_tr: string;
    title_en: string;
    description_tr: string;
    description_en: string;
    button_title_tr: string;
    button_title_en: string;
    button_url: string;
}

export const blogService = {
    getAllBlogs: async (): Promise<Blog[]> => {
        const { data } = await axiosInstance.get<Blog[]>("/api/blog/blogs");
        return data;
    },
    getBlogById: async (id: string): Promise<Blog> => {
        const { data } = await axiosInstance.get<Blog>(`/api/blog/blog/${id}`);
        return data;
    },
    createBlog: async (blogData: Partial<Blog>): Promise<Blog> => {
        const { data } = await axiosInstance.post<Blog>("/api/blog/create", blogData);
        return data;
    },
    updateBlog: async (id: string, updatedData: Partial<Blog>): Promise<Blog> => {
        const { data } = await axiosInstance.put<Blog>(`/api/blog/update/${id}`, updatedData);
        return data;
    },
    deleteBlog: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/api/blog/delete/${id}`);
    }
};
