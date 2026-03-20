import express from "express";
import {
  deleteContact,
  getAdminStats,
  getAllContacts,
  getAllUsers,
  deleteUser,
  updateContactStatus,
  uploadAdminImage,
} from "../controllers/adminController.js";
import {
  getAdminContentList,
  getAdminPageContent,
  resetPageContent,
  upsertPageContent,
} from "../controllers/contentController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
// Import new route modules
import blogRoutes from "./blogRoutes.js";
import teamRoutes from "./teamRoutes.js";
import serviceRoutes from "./serviceRoutes.js";

const router = express.Router();

router.use(protect, adminOnly);

// Existing routes
router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/contacts", getAllContacts);
router.patch("/contacts/:id/status", updateContactStatus);
router.delete("/contacts/:id", deleteContact);
router.delete("/users/:id", deleteUser);
router.post("/upload-image", uploadAdminImage);
router.get("/content", getAdminContentList);
router.get("/content/:slug", getAdminPageContent);
router.put("/content/:slug", upsertPageContent);
router.delete("/content/:slug", resetPageContent);

// New routes for Blog, Team, Service
router.use("/blogs", blogRoutes);
router.use("/team", teamRoutes);
router.use("/services", serviceRoutes);

export default router;