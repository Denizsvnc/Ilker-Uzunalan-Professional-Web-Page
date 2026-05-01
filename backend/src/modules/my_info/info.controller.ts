import { Request, Response } from "express";
import * as infoController from "./info.service";

export const createMyInfo = async (req: Request, res: Response) => {
    try {
        const pp_url = req.file ? `/uploads/${req.file.filename}` : "";
        const data = { ...req.body, pp_url }
        const result = await infoController.createMyInfo(data);
        res.json(result);
        res.status(200);
    } catch (err) {
        console.log("Bilgilerim alanı oluşturma hatası: ", err);
    }
}

export const getMyInfo = async (req: Request, res: Response) => {
    try {
        const myInfo = await infoController.getMyInfo;
        return myInfo;
        res.status(200);
    } catch (err) {
        console.log("Bilgilerim Çekilirken Hata Oluştu: ", err)
    }
}

export const updateMyInfo = async (req: Request, res: Response) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.pp_url = `/uploads/${req.file.filename}`;
        }
        const newInfo = await infoController.updateMyInfo(req.params.id as string, data);
        res.json(newInfo);

    } catch (err) {
        console.log("Bilgilerim Güncellenirken Hata Oluştu: ", err)
    }
}

export const deleteMyInfo = async (req: Request, res: Response) => {
    try {
        const info = await infoController.deleteMyInfo(req.params.id as string);
        res.status(204).send();
    } catch (err) {
        console.log("Bilgilerim alanı silinirken hata oluştu: ", err);
    }
}