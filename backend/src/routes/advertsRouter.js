import express from "express";
import {
  createAdvert,
  deleteAdvert,
  updateAdvert,
  getAdvert,
  getAllAdverts,
  toogleFavoriteAdvert,
} from "../controllers/advertController.js";
import {
  validateCreateAdvert,
  validateUpdateAdvert,
} from "../middlewares/validateMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, validateCreateAdvert, createAdvert);
router.get("/", getAllAdverts);

router.get("/:id", getAdvert);
router.put("/:id", isAuthenticated, validateUpdateAdvert, updateAdvert);
router.delete("/:id", isAuthenticated, deleteAdvert);

router.patch("/:id/favorite", isAuthenticated, toogleFavoriteAdvert);

export default router;
