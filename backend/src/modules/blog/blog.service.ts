import { db } from "../../db";
import { blog } from "../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
export const createBlog = async (data: {
    cover_img_url: string;
    title_tr: string;
    title_en: string;
    description_tr: string;
    description_en: string;
    button_title_tr: string;
    button_title_en: string;
    button_url: string;
}) => {
    const [createdBlog] = await db.insert(blog).values(data).returning();
    return createdBlog;
}

export const getAllBlog = async () => {
    const blogs = await db.select().from(blog);
    return blogs;
}

export const getBlog = async (id: string) => {
    const [foundBlog] = await db.select().from(blog).where(eq(blog.id, id));
    return foundBlog;
}

export const updateblog = async (id: string, data: {
    cover_img_url: string;
    title_tr: string;
    title_en: string;
    description_tr: string;
    description_en: string;
    button_title_tr: string;
    button_title_en: string;
    button_url: string;
}) => {
    const [oldBlog] = await db.select().from(blog).where(eq(blog.id, id));
    if (oldBlog && oldBlog.cover_img_url && oldBlog.cover_img_url !== data.cover_img_url) {
        const filePath = oldBlog.cover_img_url.startsWith("/uploads/")
            ? `uploads/${oldBlog.cover_img_url.replace("/uploads/", "")}`
            : oldBlog.cover_img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Eski dosya silinemedi:", err);
        }
    }
    const [updatedBlog] = await db.update(blog).set(data).where(eq(blog.id, id)).returning();
    return updatedBlog;
}

export const deleteBlog = async (id: string) => {
    const [deletedBlog] = await db.select().from(blog).where(eq(blog.id, id));
    if (deletedBlog && deletedBlog.cover_img_url) {
        // uploads klasöründen dosya yolunu sil
        const filePath = deletedBlog.cover_img_url.startsWith("/uploads/")
            ? `uploads/${deletedBlog.cover_img_url.replace("/uploads/", "")}`
            : deletedBlog.cover_img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Dosya silinemedi:", err);
        }
    }
    await db.delete(blog).where(eq(blog.id, id)).returning();
    return;
}