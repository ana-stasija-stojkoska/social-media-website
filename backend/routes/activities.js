import express from "express";
import {
    getFollowingActivities
} from "../controllers/activityController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getFollowingActivities);

export default router;