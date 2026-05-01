import Router from "express";
import * as infoController from "./info.controller";
import { singleFileUpload } from "../../common/middleware/singleFileUpload";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";
const router = Router();

router.post("/add", authMiddleware, adminMiddleware, singleFileUpload, infoController.createMyInfo);
router.get("/myinfo", infoController.getMyInfo);
router.put("/update/:id", authMiddleware, adminMiddleware, singleFileUpload, infoController.updateMyInfo);
router.delete("/delete/:id", authMiddleware, adminMiddleware, infoController.deleteMyInfo);

export default router;