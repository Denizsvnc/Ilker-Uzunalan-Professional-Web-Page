import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../../common/utils/jwt.utils";
import { LoginResponse } from "./auth.types";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
        throw new Error("Geçersiz e-posta veya şifre");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Geçersiz e-posta veya şifre");
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

export const me = async (userId: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
        throw new Error("Kullanıcı bulunamadı");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
