import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);

export default router;