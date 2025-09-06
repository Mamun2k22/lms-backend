import { config } from "dotenv";
config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB(process.env.MONGODB_URI!);

export default app; // ⬅️ no app.listen here
