import { ProductVariation } from "@/core/models/product";
import { ProductModel } from "@/core/models/productModel";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import Link from "next/link";
import { AddToCartButton } from "./addToCartButton";
import { DiscountLabel } from "./discountLabel";
import { ProductScore } from "./productScore";

export function ProductItem({ product }: { product: ProductModel }) {
  const mainVariation = product.mainVariation!;

  const coverImage = mainVariation.getCandidateImageMedia();

  return (
    <Card scaleTransition className="relative grow group min-w-[230px]">
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

            <div className="h-px bg-linear-to-r from-transparent via-black group-hover:via-primary-blue-0c opacity-40 to-transparent"></div>
            <Body
              size="md"
              className="line-clamp-1 group-hover:text-primary-blue-06"
            >
              {product.title}
            </Body>
          </Column>
        </Link>
        <Row className="justify-between my-2 mt-auto h-[55px]" centerV>
          <AddToCartButton
            product={product.toRawProduct()}
            variation={mainVariation.toRawVariation()}
          />
          <Column className="group-hover:hidden">
            {mainVariation.hasDiscount ? (
              <>
                <Caption
                  size="md"
                  className="text-gray-neutral-71 line-through"
                >{`$${mainVariation.price}`}</Caption>
                <Body size="lg">{`$${mainVariation.finalPrice}`}</Body>
              </>
            ) : (
              <Body size="lg">{`$${mainVariation.price}`}</Body>
            )}
          </Column>
          <ProductScore score={product.averageScore} />
        </Row>
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
