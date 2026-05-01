import { Router } from "express";
import * as heroController from "./hero.controller";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";
import { singleFileUpload } from "../../common/middleware/singleFileUpload";
const router = Router();

router.get("/all", heroController.getAllHeroSection);
router.post("/add", authMiddleware, adminMiddleware, singleFileUpload, heroController.createHeroSection);
router.put("/update/:id", authMiddleware, adminMiddleware, singleFileUpload, heroController.updateHeroSection);
router.delete("/delete/:id", authMiddleware, adminMiddleware, heroController.deleteHeroSection);

export default router;