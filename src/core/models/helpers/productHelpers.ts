import { Product } from "../product";

export function getMainMedia(product: Product) {
  const coverImage = product.media?.find((m) => m.isMain);
  if (!coverImage && product.media?.length) {
    return product.media?.find((m) => m.type == "Image");
  }

  return coverImage;
}
