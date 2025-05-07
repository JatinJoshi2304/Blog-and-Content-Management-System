// src/app.ts

import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
// import commentRoutes from "./routes/comment.route";
import path from "path";
// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Test route
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Blog CMS API 🚀" });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
// app.use("/api/v1/comment", commentRoutes);
// app.use('/api/v1/media', mediaRoutes);

// Error handler middleware (can be improved later)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await prisma.$connect();
  console.log("🛢️ Database connected successfully.");
});
