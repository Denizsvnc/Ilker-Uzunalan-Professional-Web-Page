import { db } from "../../db";
import { my_info } from "../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";

/* 
    pp_url: varchar("pp_url", { length: 255 }),
    phone_number: varchar("phone_number", { length: 255 }),
    email: varchar("email", { length: 255 }),
    linkedin_url: varchar("linkedin_url", { length: 255 }),
    instagram_url: varchar("instagram_url", { length: 255 }),
    youtube_url: varchar("youtube_url", { length: 255 }), */

export const createMyInfo = async (data: {
    pp_url: string;
    phone_number: string;
    email: string;
    linkedin_url: string;
    instagram_url: string;
    youtube_url: string;
}) => {
    const allInfo = await db.select().from(my_info);
    if (allInfo.length > 0) {
        console.log("Kişi Bilgileri Zaten Tanımlı")
    } else {
        const [newInfo] = await db.insert(my_info).values(data).returning();
        return newInfo;
    }
}

export const getMyInfo = async () => {
    const MyInfo = await db.select().from(my_info)
    return MyInfo;
}

export const updateMyInfo = async (id: string, data: {
    pp_url: string;
    phone_number: string;
    email: string;
    linkedin_url: string;
    instagram_url: string;
    youtube_url: string;
}) => {
    const [oldInfo] = await db.select().from(my_info).where(eq(my_info.id, id));
    if (oldInfo && oldInfo.pp_url && oldInfo.pp_url !== data.pp_url) {
        const filePath = oldInfo.pp_url.startsWith("/uploads/")
            ? `uploads/${oldInfo.pp_url.replace("/uploads/", "")}`
            : oldInfo.pp_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Eski dosya silinemedi:", err);
        }
    }
    const [updatedInfo] = await db.update(my_info).set(data).where(eq(my_info.id, id)).returning();
    return (updatedInfo);
}

export const deleteMyInfo = async (id: string) => {
    const [deletedInfo] = await db.select().from(my_info).where(eq(my_info.id, id));
    if (deletedInfo && deletedInfo.pp_url) {
        // uploads klasöründen dosya yolunu sil
        const filePath = deletedInfo.pp_url.startsWith("/uploads/")
            ? `uploads/${deletedInfo.pp_url.replace("/uploads/", "")}`
            : deletedInfo.pp_url;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Dosya silinemedi:", err);
        }
    }
    await db.delete(my_info).where(eq(my_info.id, id)).returning();
    return;
}