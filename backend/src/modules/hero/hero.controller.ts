import { Request, Response } from "express";
import * as heroService from "./hero.service";

export const getAllHeroSection = async (req: Request, res: Response) => {
    try {
        const hero = await heroService.getAllHeroSection();
        res.json(hero);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hero section" });
    }
};

export const createHeroSection = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Lütfen bir resim dosyası yükleyin." });
        }
        
        const data = { ...req.body };
        data.img_url = `/uploads/${req.file.filename}`;
        
        const hero = await heroService.createHeroSection(data);
        res.status(201).json(hero);
    } catch (error) {
        console.error("Create hero section error:", error);
        res.status(500).json({ error: "Failed to create hero section" });
    }
};

export const updateHeroSection = async (req: Request, res: Response) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.img_url = `/uploads/${req.file.filename}`;
        }
        const hero = await heroService.updateHeroSection(req.params.id as string, data);
        res.json(hero);
    } catch (error) {
        console.error("Update hero section error:", error);
        res.status(500).json({ error: "Failed to update hero section" });
    }
};

export const deleteHeroSection = async (req: Request, res: Response) => {
    try {
        await heroService.deleteHeroSection(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        console.error("Delete hero section error:", error);
        res.status(500).json({ error: "Failed to delete hero section" });
    }
};