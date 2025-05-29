import express from "express";
import {
  getReel,
  getReels,
  getReelsByUser,
  createReel,
  deleteReel,
} from "../controllers/reelsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getReels);
router.get("/:id", getReel); 
router.get("/user/:userid", getReelsByUser);
router.post("/", verifyToken, createReel);
router.delete("/:id", verifyToken, deleteReel);

export default router;