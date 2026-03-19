import { ProductMedia } from "../product";

interface WithMedia {
  media: ProductMedia[];
}

function getMediaOfVariation(variation: WithMedia) {
  const coverImage = variation.media?.find((m) => m.isMain);
  if (!coverImage && variation.media?.length) {
    return variation.media?.find((m) => m.type == "Image");
  }
  return coverImage;
}

export function getMainMedia(
  product: { variations: WithMedia[] },
  variation?: WithMedia,
) {
  if (variation) {
    return getMediaOfVariation(variation);
  }

  const productMedia = product.variations.find((v) => {
    return v.media.find((m) => {
      if (m.isMain) {
        return m;
      }
    });
  });

  if (productMedia) {
    return getMediaOfVariation(productMedia);
  }
}
