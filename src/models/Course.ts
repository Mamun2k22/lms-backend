import { Schema, model } from "mongoose";

export interface ICourse {
  title: string;
  description?: string;
  price: number;
  thumbnailUrl?: string;
  slug: string;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    thumbnailUrl: String,
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<ICourse>("Course", CourseSchema);
