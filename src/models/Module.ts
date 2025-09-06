import { Schema, model, Types } from "mongoose";

export interface IModule {
  courseId: Types.ObjectId;
  title: string;
  moduleNo: number; // auto-incremented per course (we'll set it in service/UI)
  order: number;    // used for sequencing
}

const ModuleSchema = new Schema<IModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNo: { type: Number, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IModule>("Module", ModuleSchema);
