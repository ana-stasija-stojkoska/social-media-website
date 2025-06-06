import express from "express";
import {
  getPosts,
  getPost,
  getPostsByUser,
  getFollowedUsersPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/feed", verifyToken, getFollowedUsersPosts);
router.get("/user/:userid", getPostsByUser);
router.get("/", getPosts);
router.get("/:id", getPost); 
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;