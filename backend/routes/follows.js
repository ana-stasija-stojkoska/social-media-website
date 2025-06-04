import express from "express";
import {
    getFollowing,
    getFollowers,
    followUser,
    unfollowUser
} from "../controllers/followsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/following/:userid", getFollowing);
router.get("/followers/:userid", getFollowers);
router.post("/", verifyToken, followUser);
router.delete("/:followedid", verifyToken, unfollowUser);

export default router;