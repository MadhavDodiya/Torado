import express from "express";

import { getAllContent, getPageContent } from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getAllContent);
router.get("/:slug", getPageContent);

export default router;
