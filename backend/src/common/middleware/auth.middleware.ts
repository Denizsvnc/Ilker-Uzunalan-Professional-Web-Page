import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Yetkilendirme başlığı eksik veya hatalı" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Bu işlem için admin yetkisi gereklidir" });
    }
    next();
};
