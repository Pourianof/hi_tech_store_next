import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import z from "zod";

export const productCreationSchema = z
  .object({
    title: z.string(),
    brandModel: z.number(),
    description: z.string().optional(),
    variations: z
      .array(
        z.object({
          color: z.int(),
          price: z.coerce.number(),
          inventory: z.coerce.number(),
          media: z
            .array(
              z.object({
                file: z.file(),
                type: z.enum(["image", "video"]),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
    categoryValues: z.object({
      categoryId: z.coerce.number(),
      componentModels: z.array(z.coerce.number()),
      properties: z.array(
        z.object({
          propertyId: z.coerce.number(),
          propertyValue: z.string(),
        }),
      ),
    }),
  })
  .transform((base) => {
    // associate variation media metadata based on when medias aggregated in one array
    // to address them by index
    const variationsMetadata: { isMain: boolean; index: number }[][] = [];
    const medias = [];
    for (let i = 0; i < base.variations.length; i++) {
      const variation = base.variations[i];

      const isMainSpecified = false;
      variationsMetadata.push(
        variation.media.map((media, idx) => {
          return {
            isMain: !isMainSpecified && media.type == "image",
            index: medias.length + idx,
          };
        }),
      );

      medias.push(...variation.media);
    }

    const formData = convertFieldValuesToFormData({
      ...base,
      variations: base.variations.map((v, i) => ({
        color: v.color,
        inventory: v.inventory,
        price: v.price,
        mediaMetaData: variationsMetadata[i],
      })),
    });

    medias.forEach((media) => formData.append("media", media.file));

    return formData;
  });
