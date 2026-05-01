import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import authRoutes from "./modules/auth/auth.routes";
import heroRoutes from "./modules/hero/hero.routes";
import aboutRoutes from "./modules/aboutUs/about.routes";
import blogRoutes from "./modules/blog/blog.routes";
import infoRoutes from "./modules/my_info/info.routes";
import projectsRoutes from "./modules/projects/projects.routes";

import { apiReference } from "@scalar/express-api-reference";
import { openapiDocument } from "./docs/openapi";

dotenv.config();

const BACKEND_PORT = process.env.BACKEND_PORT || 3005;
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  '/api/docs',
  apiReference({
    theme: 'default',
    spec: {
      content: openapiDocument,
    },
  })
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/aboutUs", aboutRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/projects", projectsRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err.message, "Field:", err.field);
        return res.status(400).json({ error: "Dosya yükleme hatası: " + err.message, field: err.field });
    } else if (err) {
        console.error("Global Error:", err);
        return res.status(500).json({ error: "Sunucu hatası: " + err.message });
    }
    next();
});

app.listen(BACKEND_PORT, () => {
    console.log(`Sunucu şu portta çalışıyor ${BACKEND_PORT}`);
    console.log(`http://localhost:${BACKEND_PORT}/api/docs`)
});