import { Router } from "express";
import * as projectsController from "./projects.controller";
import { upload } from "../../common/middleware/singleFileUpload";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }]), projectsController.createProjects);
router.get("/", projectsController.getAllProjects);
router.get("/:id", projectsController.getProjectById);
router.put("/:id", authMiddleware, adminMiddleware, upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }]), projectsController.updateProjectById);
router.delete("/:id", authMiddleware, adminMiddleware, projectsController.deleteProjectById);

export default router;
