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
import adminBlogRoutes from "./adminBlogRoutes.js";
import adminTeamRoutes from "./adminTeamRoutes.js";
import adminServiceRoutes from "./adminServiceRoutes.js";

const router = express.Router();

// All routes under /api/admin are protected
router.use(protect, adminOnly);

// Stats & users
router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Contacts
router.get("/contacts", getAllContacts);
router.patch("/contacts/:id/status", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

// Image upload
router.post("/upload-image", uploadAdminImage);

// Content/CMS
router.get("/content", getAdminContentList);
router.get("/content/:slug", getAdminPageContent);
router.put("/content/:slug", upsertPageContent);
router.delete("/content/:slug", resetPageContent);

// Data management - sub-routers (already protected by router.use above)
router.use("/blogs", adminBlogRoutes);
router.use("/team", adminTeamRoutes);
router.use("/services", adminServiceRoutes);

export default router;