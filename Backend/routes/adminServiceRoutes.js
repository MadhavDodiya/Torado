import express from "express";
import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getService);
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;