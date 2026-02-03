import { Product, ProductVariation } from "../product";

function getMediaOfVariation(variation: ProductVariation) {
  const coverImage = variation.media?.find((m) => m.isMain);
  if (!coverImage && variation.media?.length) {
    return variation.media?.find((m) => m.type == "Image");
  }
  return coverImage;
}

export function getMainMedia(product: Product, variation?: ProductVariation) {
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
