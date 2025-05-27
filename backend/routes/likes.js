import express from "express";
import {
  getLike,
  getLikes,
  getLikesByPost,
  createLike,
  deleteLike,
} from "../controllers/likesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getLikes);
router.get("/:id", getLike);
router.get("/post/:postid", getLikesByPost);
router.post("/", verifyToken, createLike);
router.delete("/post/:postid", verifyToken, deleteLike);

export default router;