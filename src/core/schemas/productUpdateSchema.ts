import { z } from "zod";

export const productUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  brandModel: z.number(),
  description: z.string().optional(),
});

export const variationUpdateSchema = z.object({
  id: z.number().optional(), // For editing existing variations
  color: z.number(),
  price: z.coerce.number().positive(),
  inventory: z.coerce.number().min(0),
  mediaToAdd: z.array(z.file()).optional(),
  mediaToRemove: z.array(z.string()).optional(), // Media IDs to remove
  thumbnailUpdates: z
    .array(
      z.object({
        mediaId: z.string(),
        newThumbnail: z.file(),
      }),
    )
    .optional(),
});

export type ProductUpdateFormData = z.infer<typeof productUpdateSchema>;
export type VariationUpdateData = z.infer<typeof variationUpdateSchema>;
