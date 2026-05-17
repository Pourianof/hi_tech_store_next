import z from "zod";

export const productVariationNewMediaSchema = z
  .object({
    file: z.file(),
    thumbnail: z.file().optional(),
  })
  .transform((baseData) => {
    const formData = new FormData();

    formData.append("file", baseData.file);
    if (baseData.thumbnail) {
      formData.append("thumbnail", baseData.thumbnail);
    }

    return formData;
  });

export type ProductVariationNewMediaDto = z.infer<
  typeof productVariationNewMediaSchema
>;
