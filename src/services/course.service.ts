import Course from "../models/Course.js";

export const listCourses = () => Course.find().sort({ createdAt: -1 });
export const getBySlug = (slug: string) => Course.findOne({ slug });
export const createCourse = (data: any) => Course.create(data);
export const updateCourse = (id: string, data: any) =>
  Course.findByIdAndUpdate(id, data, { new: true });
export const deleteCourse = (id: string) => Course.findByIdAndDelete(id);
