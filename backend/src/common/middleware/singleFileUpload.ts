import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";

if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/', { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.').pop();
        const uniqueSuffix = Date.now() + '-' + Date.now();
        cb(null, uniqueSuffix + '.' + fileExt);
    }
});

export const upload = multer({ storage });

export const singleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message || "Dosya yükleme hatası oluştu." });
        }
        next();
    });
}