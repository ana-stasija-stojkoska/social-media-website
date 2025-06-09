import express from "express";
import {
    getFollowing,
    getFollowers,
    followUser,
    unfollowUser,
    getSuggestedUsers
} from "../controllers/followsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/following/:userid", getFollowing);
router.get("/followers/:userid", getFollowers);
router.post("/", verifyToken, followUser);
router.delete("/:followedid", verifyToken, unfollowUser);
router.get("/suggested", verifyToken, getSuggestedUsers);

export default router;