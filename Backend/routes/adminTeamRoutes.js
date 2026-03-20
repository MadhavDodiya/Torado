import express from "express";
import {
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getAllTeamMembers);
router.get("/:id", getTeamMember);
router.post("/", createTeamMember);
router.patch("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

export default router;