import { Request, response, Response } from "express";
import * as aboutService from "./about.service"

export const createAboutUs = async (req: Request, res: Response) => {
    try {
        const img_url = req.file ? `/uploads/${req.file.filename}` : "";
        const data = { ...req.body, img_url }
        const result = await aboutService.createAboutUs(data);
        res.json(result);
    } catch (err) {
        console.log("Hakkımızda alanı oluşturulurken hata oluştu")
        console.log("Hakkımızda Alanı Oluşturma Hatası : ", err)
    }

}

export const getAboutUs = async (req: Request, res: Response) => {
    try {
        const data = await aboutService.getAboutUs();
        res.status(200).json(data);
    } catch (err) {
        console.log("Hakkımızda alanı getirlirken hata oluştu");
        console.log("Hakkımızda alanı getirlirken hata oluştu", err)
    }
}

export const updateAboutUs = async (req: Request, res: Response) => {
    try {
        const data = { ...req.body }
        if (req.file) {
            data.img_url = `/uploads/${req.file.filename}`;
        }
        const aboutUs = await aboutService.updateAboutus(req.params.id as string, data)
        res.json(aboutUs);
        res.status(200)
    } catch (err) {
        console.log("Hakkımızda alanı güncellenirken bir hata oluştu");
        console.log("Hakkımızda alanı güncelleme hatası: ", err)
    }
}

export const deleteAboutUs = async (req: Request, res: Response) => {
    try {
        await aboutService.deleteAbousUs(req.params.id as string);
        res.status(204).send();
    } catch (err) {
        console.log("Silme işleminde bir hata oluştu");
        console.log("Hakkımızda alanı silme hatası: ", err)
    }
}