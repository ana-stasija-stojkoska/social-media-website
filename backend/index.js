import express from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

import authRoutes from "./routes/userAuth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)

app.listen(process.env.PORT, () => {
    console.log("API working!")
});