import { z } from "zod";

export const productUpdateSchema = z
  .object({
    title: z.string().min(2, "Title is required").optional(),
    brandModelId: z.number().optional(),
    description: z.string().optional(),
  })
  .transform((base) => ({
    title: base.title,
    brandModelId: base.brandModelId,
    description: base.description,
  }));

export type ProductUpdateFormDto = z.infer<typeof productUpdateSchema>;
