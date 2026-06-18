import z from "zod";

export const brandModelCreationSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(3).optional(),
    brandId: z.int().optional(),
    brand: z
      .object({
        name: z.string(),
        image: z.file(),
      })
      .optional(),
  })
  .refine((base) => !!base.brand || !!base.brandId, {
    error: "You must specify or define a brand for brand-model",
  });
