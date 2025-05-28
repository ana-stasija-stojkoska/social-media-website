import express from "express";
import {
  getPostLike,
  getPostLikes,
  getPostLikesByPost,
  createPostLike,
  deletePostLike,
} from "../controllers/postLikesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPostLikes);
router.get("/:id", getPostLike);
router.get("/post/:postid", getPostLikesByPost);
router.post("/", verifyToken, createPostLike);
router.delete("/post/:postid", verifyToken, deletePostLike);

export default router;