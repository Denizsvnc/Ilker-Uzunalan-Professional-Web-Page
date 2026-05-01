import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./modules/auth/auth.routes";
import heroRoutes from "./modules/hero/hero.routes";
import aboutRoutes from "./modules/aboutUs/about.routes";
import blogRoutes from "./modules/blog/blog.routes";
dotenv.config();

const BACKEND_PORT = process.env.BACKEND_PORT || 3005;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/aboutUs", aboutRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(BACKEND_PORT, () => {
    console.log(`Sunucu şu portta çalışıyor ${BACKEND_PORT}`);
});