import { Schema, model, Types } from "mongoose";

export interface ILecturePDF { name: string; url: string; }

export interface ILecture {
  moduleId: Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfs: ILecturePDF[];
  order: number; // global sequence within a course (we'll keep increasing)
}

const LectureSchema = new Schema<ILecture>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfs: [{ name: String, url: String }],
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<ILecture>("Lecture", LectureSchema);
