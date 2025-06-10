import express from "express";
import {
  getReel,
  getReels,
  getReelsByUser,
  getFollowedUsersReels,
  createReel,
  deleteReel,
} from "../controllers/reelsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getReels);
router.get("/feed", verifyToken, getFollowedUsersReels);
router.get("/user/:userid", getReelsByUser);
router.get("/:id", getReel);
router.post("/", verifyToken, createReel);
router.delete("/:id", verifyToken, deleteReel);

export default router;