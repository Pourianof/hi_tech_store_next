import { ApiImage } from "@/ui/image/ApiImage";
import Link from "next/link";
import { ProductScore } from "./productScore";
import { ProductDto } from "@/core/Dtos/ProductDto";

export function ProductItem({ product }: { product: ProductDto }) {
  const coverImage = product.media?.find((m) => m.isMain)?.url;

  return (
    <div className="shadow-md rounded-md flex flex-col p-2">
      <Link href={`/products/${product.productId}`}>
        <ApiImage
          aspectRatio={256 / 190}
          src={coverImage}
          alt={product.title}
        />

        <div className="h-px bg-linear-to-r from-transparent via-black opacity-40 to-transparent my-2"></div>
        <h3 className="line-clamp-2 text-sm flex-1">{product.title}</h3>
      </Link>
      <div className="flex justify-between my-2">
        <span>{`$${product.price.toFixed(2)}`}</span>
        <ProductScore score={product.averageScore} />
      </div>
    </div>
  );
}
