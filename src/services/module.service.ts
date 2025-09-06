import Module from "../models/Module.js";

export const listModules = (courseId: string) =>
  Module.find({ courseId }).sort({ moduleNo: 1 });

export const createModule = async (data: { courseId: string; title: string }) => {
  const { courseId, title } = data;

  // find last moduleNo for this course
  const last = await Module.find({ courseId }).sort({ moduleNo: -1 }).limit(1);
  const nextNo = (last[0]?.moduleNo ?? 0) + 1;

  // keep order same as moduleNo (simple & stable)
  return Module.create({ courseId, title, moduleNo: nextNo, order: nextNo });
};

export const updateModule = (id: string, data: any) =>
  Module.findByIdAndUpdate(id, data, { new: true });

export const deleteModule = (id: string) => Module.findByIdAndDelete(id);
