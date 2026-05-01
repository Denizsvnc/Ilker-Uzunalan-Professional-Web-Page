import { Router } from "express";
import { singleFileUpload } from "../../common/middleware/singleFileUpload";
import * as aboutContoller from "./about.controller";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";
const router = Router();

router.post("/create", authMiddleware, adminMiddleware, singleFileUpload, aboutContoller.createAboutUs);
router.get("/aboutUs", aboutContoller.getAboutUs);
router.put("/update/:id", authMiddleware, adminMiddleware, singleFileUpload, aboutContoller.updateAboutUs);
router.delete("/delete/:id", authMiddleware, adminMiddleware, aboutContoller.deleteAboutUs)




export default router;