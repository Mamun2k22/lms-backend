import express from "express";
import cors from "cors";

import { notFound, errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import moduleRoutes from "./routes/module.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";
import progressRoutes from "./routes/progress.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/auth", authRoutes);        // ⬅️ Admin login
app.use("/courses", courseRoutes);
app.use("/modules", moduleRoutes);
app.use("/lectures", lectureRoutes);
app.use("/progress", progressRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
