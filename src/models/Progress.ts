import { Schema, model, Types } from "mongoose";

export interface IProgress {
  userId: Types.ObjectId;   // for demo we’ll use a fixed id
  courseId: Types.ObjectId;
  completedLectureIds: Types.ObjectId[];
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLectureIds: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  },
  { timestamps: true }
);

// optional unique index (user+course)
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default model<IProgress>("Progress", ProgressSchema);
