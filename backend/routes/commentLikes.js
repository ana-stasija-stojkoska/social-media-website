import express from "express";
import {
  getCommentLike,
  getCommentLikes,
  getCommentLikesByComment,
  createCommentLike,
  deleteCommentLike,
} from "../controllers/commentLikesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getCommentLikes);
router.get("/:id", getCommentLike);
router.get("/comment/:commentid", getCommentLikesByComment);
router.post("/", verifyToken, createCommentLike);
router.delete("/:commentid", verifyToken, deleteCommentLike);

export default router;