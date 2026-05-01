import { Request, Response } from "express";
import * as blogService from "./blog.service";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const img_url = req.file ? `/uploads/${req.file.filename}` : "";
        const data = { ...req.body, img_url }
        const result = await blogService.createBlog(data);
        res.json(result);
    } catch (err) {
        console.log("Blog Oluşturulurken Hata Oluştu: ", err);
    }
}

export const getAllBlog = async (req: Request, res: Response) => {
    try {
        const blogs = await blogService.getAllBlog();
        res.json(blogs)
    } catch (err) {
        console.log("Bloglar getirilirken hata oluştu", err)
    }
}

export const getBlog = async (req: Request, res: Response) => {
    try {
        const blog = await blogService.getBlog(req.body.id)
        res.json(blog);
    } catch (err) {
        console.log("Blog getirilirken hata oluştu", err)
    }
}

export const updateblog = async (req: Request, res: Response) => {
    try {
        const data = { ...req.body }
        if (req.file) {
            data.img_url = `/uploads/${req.file.filename}`;
        }
        const blog = await blogService.updateblog(req.params.id as string, data);
        res.json(blog);
    } catch (err) {
        console.log("Bloglar güncellenirken hata oluştu", err)
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog = await blogService.deleteBlog(req.params.id as string);
        res.status(204).send();
    } catch (err) {
        console.log("Blog silinirken hata oluştu", err)
    }
}