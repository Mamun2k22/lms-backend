// src/dev.ts
import "./server.js";     // connects DB and exports app (no listen here)
import app from "./app.js";

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 API running at http://localhost:${port}`);
});
