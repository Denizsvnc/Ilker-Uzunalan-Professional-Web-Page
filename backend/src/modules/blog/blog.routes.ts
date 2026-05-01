import Router from "express";
import { singleFileUpload } from "../../common/middleware/singleFileUpload";
import * as blogController from "./blog.controller";
import { authMiddleware, adminMiddleware } from "../../common/middleware/auth.middleware";
const router = Router();

router.post("/create", authMiddleware, adminMiddleware, singleFileUpload, blogController.createBlog)
router.get("/blogs", blogController.getAllBlog);
router.get("/blog/:id", blogController.getBlog);
router.put("/update/:id", authMiddleware, adminMiddleware, singleFileUpload, blogController.updateblog);
router.delete("/delete/:id", authMiddleware, adminMiddleware, blogController.deleteBlog);
export default router;