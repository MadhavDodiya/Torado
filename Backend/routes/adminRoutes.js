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

const router = express.Router();

router.use(protect, adminOnly);

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

export default router;
