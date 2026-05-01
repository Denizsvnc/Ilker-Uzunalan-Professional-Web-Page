import { db } from "../../db";
import { blog, hero_section } from "../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
export const getAllHeroSection = async () => {
    const heroes = await db.select().from(hero_section);
    return heroes;
}

export const createHeroSection = async (data: {
    img_url: string;
    title_tr?: string;
    title_en?: string;
    description_tr?: string;
    description_en?: string;
    button_title_tr?: string;
    button_title_en?: string;
    button_url?: string;
}) => {
    const [createdHero] = await db.insert(hero_section).values(data).returning();
    return createdHero;
}

export const updateHeroSection = async (id: string, data: {
    img_url: string;
    title_tr?: string;
    title_en?: string;
    description_tr?: string;
    description_en?: string;
    button_title_tr?: string;
    button_title_en?: string;
    button_url?: string;
}) => {
    // Doğru tabloyu kullan: hero_section
    const [oldHero] = await db.select().from(hero_section).where(eq(hero_section.id, id));
    if (oldHero && oldHero.img_url && oldHero.img_url !== data.img_url) {
        const filePath = oldHero.img_url.startsWith("/uploads/")
            ? `uploads/${oldHero.img_url.replace("/uploads/", "")}`
            : oldHero.img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Eski dosya silinemedi:", err);
        }
    }
    const [updatedHero] = await db.update(hero_section).set(data).where(eq(hero_section.id, id)).returning();
    return updatedHero;
}

export const deleteHeroSection = async (id: string) => {
    const [deletedHeroSection] = await db.select().from(hero_section).where(eq(hero_section.id, id));
    if (deletedHeroSection && deletedHeroSection.img_url) {
        const filePath = deletedHeroSection.img_url.startsWith("/uploads/")
            ? `uploads/${deletedHeroSection.img_url.replace("/uploads/", "")}`
            : deletedHeroSection.img_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Dosya silinemedi:", err);
        }
    }
    await db.delete(hero_section).where(eq(hero_section.id, id));
}