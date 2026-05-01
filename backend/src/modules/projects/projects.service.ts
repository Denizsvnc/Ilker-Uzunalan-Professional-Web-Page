import { db } from "../../db";
import { project_details, my_projects } from "../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";

export const createProjects = async (
    cover_data: {
        cover_img_url: string;
        title_tr: string;
        title_en: string;
        description_tr: string;
        description_en: string;
        button_title_tr: string;
        button_title_en: string;
        button_url: string;
    },
    detail_data: Array<{
        url: string;
        type: 'image' | 'video';
    }>
) => {
    const [newProjectCover] = await db.insert(my_projects).values(cover_data).returning();
    const newProjectDetails = [];
    for (const detail of detail_data) {
        const detailWithProject = { ...detail, details: newProjectCover.id };
        const [insertedDetail] = await db.insert(project_details).values(detailWithProject).returning();
        newProjectDetails.push(insertedDetail);
    }
    const result = { project: newProjectCover, details: newProjectDetails };
    return result;
};

export const getAllProjects = async () => {
    const allProjects = await db.select().from(my_projects);
    return allProjects;
};

export const getProjectById = async (id: string) => {
    const project = await db.select().from(my_projects).where(eq(my_projects.id, id));
    return project;
};

export const updateProjectById = async (
    id: string,
    cover_data: {
        cover_img_url: string;
        title_tr: string;
        title_en: string;
        description_tr: string;
        description_en: string;
        button_title_tr: string;
        button_title_en: string;
        button_url: string;
    },
    detail_data: Array<{
        url: string;
        type: 'image' | 'video';
    }>
) => {
    await db.update(my_projects).set(cover_data).where(eq(my_projects.id, id));


    const oldDetails = await db.select().from(project_details).where(eq(project_details.details, id));
    for (const detail of oldDetails) {
        if (detail.url && detail.url.startsWith("/uploads/")) {

            const filePath = `uploads/${detail.url.replace("/uploads/", "")}`;
            try {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            } catch (err) { }
        }
    }
    await db.delete(project_details).where(eq(project_details.details, id));


    const newProjectDetails = [];
    for (const detail of detail_data) {
        const detailWithProject = { ...detail, details: id };
        const [insertedDetail] = await db.insert(project_details).values(detailWithProject).returning();
        newProjectDetails.push(insertedDetail);
    }
    return { updated: true, details: newProjectDetails };
};

export const deleteProjectById = async (id: string) => {
    const [project] = await db.select().from(my_projects).where(eq(my_projects.id, id));
    const details = await db.select().from(project_details).where(eq(project_details.details, id));

    for (const detail of details) {
        if (detail.url && detail.url.startsWith("/uploads/")) {
            const filePath = `uploads/${detail.url.replace("/uploads/", "")}`;
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (err) {
                console.error("Dosya silinemedi:", err);
            }
        }
    }

    if (project && project.cover_img_url && project.cover_img_url.startsWith("/uploads/")) {
        const filePath = `uploads/${project.cover_img_url.replace("/uploads/", "")}`;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error("Kapak dosyası silinemedi:", err);
        }
    }

    await db.delete(project_details).where(eq(project_details.details, id));
    const [deletedProject] = await db.delete(my_projects).where(eq(my_projects.id, id)).returning();

    return deletedProject;
};