import { Router } from "express";
import * as AuthController from "./auth.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", authMiddleware, AuthController.me);

export default router;
