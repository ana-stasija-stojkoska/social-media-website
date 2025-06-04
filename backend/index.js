import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies to be sent
  })
);
app.use(cookieParser());

import authRoutes from "./routes/userAuth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import postLikeRoutes from "./routes/postLikes.js";
import commentLikeRoutes from "./routes/commentLikes.js";
import reelRoutes from "./routes/reels.js";
import followRoutes from "./routes/follows.js"

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/postLikes", postLikeRoutes);
app.use("/api/commentLikes", commentLikeRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/follows", followRoutes)

app.listen(process.env.PORT, () => {
  console.log("API working!");
});
