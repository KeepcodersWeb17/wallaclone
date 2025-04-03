import express from "express";
import {
  createAdvert,
  deleteAdvert,
  getAdvert,
  getAllAdverts,
  updateAdvert,
} from "../controllers/advertController.js";
import {
  validateCreateAdvert,
  validateUpdateAdvert,
} from "../middlewares/validateMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, validateCreateAdvert, createAdvert);

export default router;
