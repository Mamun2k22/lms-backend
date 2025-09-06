import { config } from "dotenv"; config();
import { connectDB } from "../config/db.js";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Lecture from "../models/Lecture.js";

async function run() {
  await connectDB(process.env.MONGODB_URI!);

  await Promise.all([Course.deleteMany({}), Module.deleteMany({}), Lecture.deleteMany({})]);

  const course = await Course.create({
    title: "TypeScript 101",
    description: "Basics to Advanced",
    price: 99,
    thumbnailUrl: "https://picsum.photos/seed/ts/600/400",
    slug: "typescript-101",
  });

  const m1 = await Module.create({ courseId: course._id, title: "Introduction", moduleNo: 1, order: 1 });
  const m2 = await Module.create({ courseId: course._id, title: "Core Types",  moduleNo: 2, order: 2 });

  await Lecture.create({ moduleId: m1._id, title: "Welcome",    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", pdfs: [], order: 1 });
  await Lecture.create({ moduleId: m1._id, title: "Setup",      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", pdfs: [], order: 2 });
  await Lecture.create({ moduleId: m2._id, title: "Primitives", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", pdfs: [], order: 3 });

  console.log("✅ Seeded"); process.exit(0);
}
run();
