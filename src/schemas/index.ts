import { z } from "zod";

/** Common */
const objectId = z.string().length(24, "Invalid id");

/** ---------- Params & Query Schemas ---------- */
export const byIdParams = z.object({
  id: objectId,
});

export const bySlugParams = z.object({
  slug: z.string().min(2, "Slug is required"),
});

// ?course=<id>
export const byCourseQuery = z.object({
  course: objectId.optional(),
});

// lectures list supports ?course=<id> or ?module=<id>
export const lectureListQuery = z.object({
  course: objectId.optional(),
  module: objectId.optional(),
});

/** ---------- Course ---------- */
export const courseCreate = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, digits and hyphens"),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  description: z.string().max(2000).optional().default(""),
  thumbnailUrl: z.string().url("Thumbnail must be a valid URL").optional(),
});

export const courseUpdate = courseCreate.partial();

/** ---------- Module ---------- */
export const moduleCreate = z.object({
  courseId: objectId,
  title: z.string().min(2),
});

export const moduleUpdate = z.object({
  title: z.string().min(2).optional(),
});

/** ---------- Lecture ---------- */
export const lectureCreate = z.object({
  moduleId: objectId,
  title: z.string().min(2),
  videoUrl: z.string().url("Video must be a valid URL"),
  pdfs: z
    .array(
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
      })
    )
    .default([]),
});

export const lectureUpdate = lectureCreate.partial();

/** ---------- Auth ---------- */
export const authLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/** ---------- Progress ---------- */
export const progressQuery = z.object({
  course: objectId,
});

export const progressCompleteBody = z.object({
  courseId: objectId,
  lectureId: objectId,
});
