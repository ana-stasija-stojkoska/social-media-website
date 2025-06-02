import express from "express";
import {
  getComment,
  getComments,
  getCommentsByPost,
  getCommentsCountByPost,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/post/:postid", getCommentsByPost);
router.get("/:id", getComment);
router.get("/", getComments);
router.get("/count/:postid", getCommentsCountByPost);
router.post("/", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;