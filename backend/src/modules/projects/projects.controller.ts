import { Request, Response } from "express";
import * as projectService from "./projects.service";

export const createProjects = async (req: Request, res: Response) => {
    try {
        let cover_data = req.body.cover_data;
        let detail_data = req.body.detail_data;

        try {
            if (typeof cover_data === "string") cover_data = JSON.parse(cover_data);
            if (typeof detail_data === "string") detail_data = JSON.parse(detail_data);
        } catch (parseError) {
            return res.status(400).json({ error: "Geçersiz JSON formatı. Lütfen detail_data alanını doğru bir JSON formatında gönderin veya boş bırakın." });
        }

        if (!cover_data) cover_data = { ...req.body };
        if (!detail_data) detail_data = req.body.details || [];

        const files = req.files as any;
        const cover_img = files?.['cover_img']?.[0] || req.file;

        if (cover_img) {
            cover_data.cover_img_url = `/uploads/${cover_img.filename}`;
        }

        const detail_imgs_array = files?.['detail_imgs'] || files?.['detail_imgs[]'];
        if (detail_imgs_array) {
            detail_imgs_array.forEach((file: any) => {
                detail_data.push({ url: `/uploads/${file.filename}`, type: 'image' });
            });
        }

        let video_urls = req.body.video_urls;
        if (video_urls) {
            if (typeof video_urls === "string") {
                try {
                    video_urls = JSON.parse(video_urls);
                } catch (e) {
                    video_urls = [video_urls];
                }
            }
            if (Array.isArray(video_urls)) {
                video_urls.forEach((url: string) => {
                    detail_data.push({ url, type: 'video' });
                });
            }
        }

        const project = await projectService.createProjects(cover_data, detail_data);
        res.status(201).json(project);
    } catch (error) {
        console.error("Proje oluşturma hatası: ", error);
        res.status(500).json({ error: "Proje oluşturulamadı" });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    } catch (error) {
        console.error("Projeler getirilirken hata oluştu: ", error);
        res.status(500).json({ error: "Projeler getirilemedi" });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProjectById(id as string);
        if (!project || project.length === 0) {
            return res.status(404).json({ error: "Proje bulunamadı" });
        }
        res.json(project[0]);
    } catch (error) {
        console.error("Proje getirilirken hata oluştu: ", error);
        res.status(500).json({ error: "Proje getirilemedi" });
    }
};

export const updateProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let cover_data = req.body.cover_data;
        let detail_data = req.body.detail_data;

        try {
            if (typeof cover_data === "string") cover_data = JSON.parse(cover_data);
            if (typeof detail_data === "string") detail_data = JSON.parse(detail_data);
        } catch (parseError) {
            return res.status(400).json({ error: "Geçersiz JSON formatı. Lütfen detail_data alanını doğru bir JSON formatında gönderin veya boş bırakın." });
        }

        if (!cover_data) cover_data = { ...req.body };
        if (!detail_data) detail_data = req.body.details || [];

        const files = req.files as any;
        const cover_img = files?.['cover_img']?.[0] || req.file;

        if (cover_img) {
            cover_data.cover_img_url = `/uploads/${cover_img.filename}`;
        }

        const detail_imgs_array = files?.['detail_imgs'] || files?.['detail_imgs[]'];
        if (detail_imgs_array) {
            detail_imgs_array.forEach((file: any) => {
                detail_data.push({ url: `/uploads/${file.filename}`, type: 'image' });
            });
        }

        let video_urls = req.body.video_urls;
        if (video_urls) {
            if (typeof video_urls === "string") {
                try {
                    video_urls = JSON.parse(video_urls);
                } catch (e) {
                    video_urls = [video_urls];
                }
            }
            if (Array.isArray(video_urls)) {
                video_urls.forEach((url: string) => {
                    detail_data.push({ url, type: 'video' });
                });
            }
        }

        const project = await projectService.updateProjectById(id as string, cover_data, detail_data);
        res.json(project);
    } catch (error) {
        console.error("Proje güncellenirken hata oluştu: ", error);
        res.status(500).json({ error: "Proje güncellenemedi" });
    }
};

export const deleteProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await projectService.deleteProjectById(id as string);
        res.status(204).send();
    } catch (error) {
        console.error("Proje silinirken hata oluştu: ", error);
        res.status(500).json({ error: "Proje silinemedi" });
    }
};