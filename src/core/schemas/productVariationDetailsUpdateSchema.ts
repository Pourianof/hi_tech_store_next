import z from "zod";

export const productVariationDetailsUpdateSchema = z.object({
  price: z.coerce.number().optional(),
  inventory: z.coerce.number().int().optional(),
  colorId: z.coerce.number().int().optional(),
});

export type ProductVariationDetailsUpdateDto = z.infer<
  typeof productVariationDetailsUpdateSchema
>;
