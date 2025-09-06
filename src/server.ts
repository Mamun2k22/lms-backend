import { config } from "dotenv";
config();

import { connectDB } from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGODB_URI!);
  app.listen(port, () => {
    console.log(`🚀 API running at http://localhost:${port}`);
  });
}

start();
