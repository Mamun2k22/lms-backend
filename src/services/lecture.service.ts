import Lecture from "../models/Lecture.js";
import Module from "../models/Module.js";

// List lectures either by module or by course
export const listLectures = async (filter: { moduleId?: string; courseId?: string }) => {
  const { moduleId, courseId } = filter;

  if (moduleId) {
    return Lecture.find({ moduleId }).sort({ order: 1 });
  }

  if (courseId) {
    const modules = await Module.find({ courseId }).select("_id");
    return Lecture.find({ moduleId: { $in: modules.map(m => m._id) } }).sort({ order: 1 });
  }

  // fallback: return all lectures
  return Lecture.find().sort({ order: 1 });
};

// Create lecture with auto-incremented global order per course
export const createLecture = async (data: { moduleId: string; title: string; videoUrl: string; pdfs?: { name: string; url: string }[] }) => {
  const { moduleId, title, videoUrl, pdfs } = data;

  // find parent module
  const mod = await Module.findById(moduleId);
  if (!mod) throw new Error("Module not found");

  // get all modules of the same course
  const modules = await Module.find({ courseId: mod.courseId }).select("_id");

  // find the last lecture by order across this course
  const last = await Lecture.find({ moduleId: { $in: modules.map(m => m._id) } })
    .sort({ order: -1 })
    .limit(1);

  const nextOrder = (last[0]?.order ?? 0) + 1;

  return Lecture.create({
    moduleId,
    title,
    videoUrl,
    pdfs: pdfs ?? [],
    order: nextOrder,
  });
};

export const updateLecture = (id: string, data: any) =>
  Lecture.findByIdAndUpdate(id, data, { new: true });

export const deleteLecture = (id: string) => Lecture.findByIdAndDelete(id);
