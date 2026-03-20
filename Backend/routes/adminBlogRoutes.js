import express from "express";
import {
  adminGetAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

// Mounted under /api/admin which already applies protect + adminOnly
const router = express.Router();

router.get("/", adminGetAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;