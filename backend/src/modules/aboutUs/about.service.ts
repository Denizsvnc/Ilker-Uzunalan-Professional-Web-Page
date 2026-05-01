import { db } from "../../db";
import { about_us } from "../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
export const getAboutUs = async () => {
    const aboutUs = await db.select().from(about_us);
    return aboutUs;
}

export const createAboutUs = async (data: {
    img_url: string;
    title_tr?: string;
    title_en?: string;
    description_tr?: string;
    description_en?: string;
    button_title_tr?: string;
    button_title_en?: string;
    button_url?: string;
}) => {
    const [createdAboutUs] = await db.insert(about_us).values(data).returning();
    return createdAboutUs;
}

export const updateAboutus = async (id: string, data: {
    img_url: string;
    title_tr?: string;
    title_en?: string;
    description_tr?: string;
    description_en?: string;
    button_title_tr?: string;
    button_title_en?: string;
    button_url?: string;
}) => {
    const [oldAboutUs] = await db.select().from(about_us).where(eq(about_us.id, id));
    if (oldAboutUs && oldAboutUs.img_url && oldAboutUs.img_url !== data.img_url) {
        const filePath = oldAboutUs.img_url.startsWith("/uploads/")
            ? `uploads/${oldAboutUs.img_url.replace("/uploads/", "")}`
            : oldAboutUs.img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Eski dosya silinemedi:", err);
        }
    }
    const updatedAboutUs = await db.update(about_us).set(data).where(eq(about_us.id, id)).returning();
    return (updateAboutus);

}

export const deleteAbousUs = async (id: string) => {
    const [deletedAboutUs] = await db.select().from(about_us).where(eq(about_us.id, id))
    if (deletedAboutUs && deletedAboutUs.img_url) {
        const filePath = deletedAboutUs.img_url.startsWith("/uploads/")
            ? `uploads/${deletedAboutUs.img_url.replace("/uploads/", "")}`
            : deletedAboutUs.img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Dosya silinemedi:", err);
        }
    }
    await db.delete(about_us).where(eq(about_us.id, id))
}