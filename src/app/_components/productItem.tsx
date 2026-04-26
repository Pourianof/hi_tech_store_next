import { ProductModel } from "@/core/models/productModel";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Card } from "@/ui/theme/card";
import { Caption } from "@/ui/theme/text/caption";
import Link from "next/link";
import { DiscountLabel } from "./discountLabel";
import { ProductScore } from "./productScore";
import { ProductVariation } from "@/core/models/product";
import { Body } from "@/ui/theme/text/body";

export function ProductItem({ product }: { product: ProductModel }) {
  const mainVariation = product.mainVariation!;

  const coverImage = mainVariation.getCandidateImageMedia();

  return (
    <Card scaleTransition className="relative">
      <Column className="gap-16px group">
        {mainVariation.hasDiscount && (
          <DiscountLabel
            discount={+mainVariation.discountPercentage.toFixed(1)}
          />
        )}
        <Link href={`/products/${product.productId}`}>
          <Column className="gap-16px">
            <div className="relative">
              <ApiImage
                aspectRatio={256 / 190}
                src={coverImage?.url}
                alt={product.title}
              />
              <ProductVariationColorsPallete variations={product.variations} />
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-black opacity-40 to-transparent"></div>
            <Body
              size="md"
              className="line-clamp-1 group-hover:text-primary-blue-06"
            >
              {product.title}
            </Body>
          </Column>
        </Link>
        <div className="flex justify-between my-2 mt-auto">
          {mainVariation.hasDiscount ? (
            <Column>
              <Caption
                size="md"
                className="text-gray-neutral-71 line-through"
              >{`$${mainVariation.price}`}</Caption>
              <span>{`$${mainVariation.finalPrice}`}</span>
            </Column>
          ) : (
            <span>{`$${mainVariation.price}`}</span>
          )}
          <ProductScore score={product.averageScore} />
        </div>
      </Column>
    </Card>
  );
}

function ProductVariationColorsPallete({
  variations,
}: {
  variations: ProductVariation[];
}) {
  return (
    <Column className="absolute gap-2 z-10 top-1/2 right-1 -translate-y-1/2">
      {variations.map((pv) => (
        <div
          key={pv.productVariationId}
          className="border border-gray-neutral-44 w-12px h-3 rounded-full"
          style={{ backgroundColor: `#${pv.color.code}` }}
        ></div>
      ))}
    </Column>
  );
}
