import Progress from "../models/Progress.js";
import Module from "../models/Module.js";
import Lecture from "../models/Lecture.js";
import { Types } from "mongoose";

export async function completeAndNext(userId: string, courseId: string, lectureId: string) {
  // mark complete
  const prog = await Progress.findOneAndUpdate(
    { userId, courseId },
    { $addToSet: { completedLectureIds: new Types.ObjectId(lectureId) } },
    { upsert: true, new: true }
  );

  // compute next by global order across the course
  const modules = await Module.find({ courseId }).sort({ order: 1 });
  const lectures = await Lecture.find({ moduleId: { $in: modules.map(m => m._id) } }).sort({ order: 1 });

  const idx = lectures.findIndex(l => l._id.equals(lectureId));
  const next = idx >= 0 ? lectures[idx + 1] : null;

  return {
    nextLectureId: next?._id?.toString(),
    completedLectureIds: prog.completedLectureIds.map(id => id.toString())
  };
}
