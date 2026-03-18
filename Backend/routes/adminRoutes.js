import express from "express";

import {
  getAdminStats,
  getAllContacts,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/contacts", getAllContacts);
router.delete("/users/:id", deleteUser);

export default router;
