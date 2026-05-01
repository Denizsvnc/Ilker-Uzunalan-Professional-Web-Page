import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const generateToken = (payload: object) => {
    if (!JWT_SECRET || !JWT_EXPIRES_IN) {
        throw new Error("JWT_SECRET and JWT_EXPIRES_IN must be defined in environment variables");
    }
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN as any });
};

export const verifyToken = (token: string) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET must be defined in environment variables");
    }
    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        throw new Error("Süresi dolmuş token");
    }
};