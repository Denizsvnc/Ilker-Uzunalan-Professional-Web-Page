import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "E-posta ve şifre gereklidir" });
        }
        const result = await AuthService.login(email, password);
        return res.json(result);
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await AuthService.me(userId);
        return res.json(user);
    } catch (error: any) {
        return res.status(404).json({ message: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    return res.json({ message: "Başarıyla çıkış yapıldı" });
};
