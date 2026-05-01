import { Router } from "express";
import * as projectsController from "./projects.controller";
import { upload } from "../../common/middleware/singleFileUpload";

const router = Router();

// To handle multiple files (cover_img and detail_imgs), we can use upload.fields
// Since upload is exported as a multer instance, we can configure fields here:
router.post("/", upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }]), projectsController.createProjects);
router.get("/", projectsController.getAllProjects);
router.get("/:id", projectsController.getProjectById);
router.put("/:id", upload.fields([{ name: 'cover_img', maxCount: 1 }, { name: 'detail_imgs', maxCount: 10 }]), projectsController.updateProjectById);
router.delete("/:id", projectsController.deleteProjectById);

export default router;
