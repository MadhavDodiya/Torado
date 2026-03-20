import express from "express";
import {
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllTeamMembers);
router.get("/:id", getTeamMember);

// Admin only routes
router.post("/", protect, adminOnly, createTeamMember);
router.patch("/:id", protect, adminOnly, updateTeamMember);
router.delete("/:id", protect, adminOnly, deleteTeamMember);

export default router;
