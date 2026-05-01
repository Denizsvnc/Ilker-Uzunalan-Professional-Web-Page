import { Request, Response } from "express";
import * as projectService from "./projects.service";

export const createProjects = async (req: Request, res: Response) => {
    try {
        let cover_data = req.body.cover_data;
        let detail_data = req.body.detail_data;

        if (typeof cover_data === "string") cover_data = JSON.parse(cover_data);
        if (typeof detail_data === "string") detail_data = JSON.parse(detail_data);

        if (!cover_data) cover_data = { ...req.body };
        if (!detail_data) detail_data = req.body.details || [];

        const files = req.files as any;
        const cover_img = files?.['cover_img']?.[0] || req.file;

        if (cover_img) {
            cover_data.cover_img_url = `/uploads/${cover_img.filename}`;
        }

        if (files?.['detail_imgs']) {
            files['detail_imgs'].forEach((file: any, index: number) => {
                if (detail_data[index]) {
                    detail_data[index].img_url = `/uploads/${file.filename}`;
                } else {
                    detail_data.push({ img_url: `/uploads/${file.filename}` });
                }
            });
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

        if (typeof cover_data === "string") cover_data = JSON.parse(cover_data);
        if (typeof detail_data === "string") detail_data = JSON.parse(detail_data);

        if (!cover_data) cover_data = { ...req.body };
        if (!detail_data) detail_data = req.body.details || [];

        const files = req.files as any;
        const cover_img = files?.['cover_img']?.[0] || req.file;

        if (cover_img) {
            cover_data.cover_img_url = `/uploads/${cover_img.filename}`;
        }

        if (files?.['detail_imgs']) {
            files['detail_imgs'].forEach((file: any, index: number) => {
                if (detail_data[index]) {
                    detail_data[index].img_url = `/uploads/${file.filename}`;
                } else {
                    detail_data.push({ img_url: `/uploads/${file.filename}` });
                }
            });
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