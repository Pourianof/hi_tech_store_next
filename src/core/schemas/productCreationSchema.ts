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
              z
                .object({
                  file: z.file(),
                  type: z.enum(["image", "video"]),
                  thumbnail: z.file().optional(),
                })
                .refine(
                  (data) =>
                    data.type == "image" ||
                    (data.type == "video" && !!data.thumbnail),
                  {
                    error: "you must specify a thumbnail for video media",
                  },
                ),
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
    const variationsMetadata: {
      isMain: boolean;
      index: number;
      thumbNailIndex?: number;
    }[][] = [];

    const medias = [];
    const thumbnails: File[] = [];

    let numberOfThumbnails = 0;
    for (let i = 0; i < base.variations.length; i++) {
      const variation = base.variations[i];

      const isMainSpecified = false;

      variationsMetadata.push(
        variation.media.map((media, idx) => {
          const isImage = media.type == "image";
          const currentIndexInTotalMedias = medias.length + idx;
          const hasThumbnail = !isImage && !!media.thumbnail;

          if (hasThumbnail) {
            thumbnails.push(media.thumbnail!);
          }

          return {
            isMain: !isMainSpecified && isImage,
            index: currentIndexInTotalMedias,
            ...(hasThumbnail
              ? {
                  thumbnailIndex: numberOfThumbnails++,
                }
              : {}),
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

    medias.forEach((media) => {
      formData.append("media", media.file);
    });

    thumbnails.forEach((thumb) => {
      formData.append("thumbnails", thumb);
    });

    return formData;
  });
