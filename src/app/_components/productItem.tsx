import { ApiImage } from "@/ui/image/ApiImage";
import Link from "next/link";
import { ProductScore } from "./productScore";
import { Row } from "@/ui/layouts/row";
import { DiscountLabel } from "./discountLabel";
import { ProductModel } from "@/core/models/productModel";

export function ProductItem({ product }: { product: ProductModel }) {
  const mainVariation = product.mainVariation!;

  const coverImage = mainVariation.getCandidateImageMedia();

  return (
    <div className="shadow-md rounded-md flex flex-col p-2 gap-1 relative">
      {mainVariation.hasDiscount && (
        <DiscountLabel discount={mainVariation.discountPercentage} />
      )}
      <Link href={`/products/${product.productId}`}>
        <ApiImage
          aspectRatio={256 / 190}
          src={coverImage?.url}
          alt={product.title}
        />

        <div className="h-px bg-linear-to-r from-transparent via-black opacity-40 to-transparent my-2"></div>
        <h3 className="line-clamp-2 text-sm flex-1">{product.title}</h3>
      </Link>
      <div className="flex justify-between my-2 mt-auto">
        {mainVariation.hasDiscount ? (
          <Row centerV>
            <span className="line-through text-xs">{`$${mainVariation.price}`}</span>
            <span>{`$${mainVariation.finalPrice}`}</span>
          </Row>
        ) : (
          <span>{`$${mainVariation.price}`}</span>
        )}
        <ProductScore score={product.averageScore} />
      </div>
    </div>
  );
}
