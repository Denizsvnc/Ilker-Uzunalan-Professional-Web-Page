import { Router } from "express";
import * as projectsController from "./projects.controller";
import { upload } from "../../common/middleware/singleFileUpload";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }, { name: 'detail_imgs[]', maxCount: 10 }, { name: 'video_urls' }, { name: 'video_urls[]' }]), projectsController.createProjects);
router.get("/", projectsController.getAllProjects);
router.get("/:id", projectsController.getProjectById);
router.put("/:id", authMiddleware, adminMiddleware, upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }, { name: 'detail_imgs[]', maxCount: 10 }, { name: 'video_urls' }, { name: 'video_urls[]' }]), projectsController.updateProjectById);
router.delete("/:id", authMiddleware, adminMiddleware, projectsController.deleteProjectById);

export default router;
