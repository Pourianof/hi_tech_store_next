"use client";
import { ProductScore } from "@/app/_components/productScore";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";
import { Caption } from "@/ui/theme/text/caption";
import Link from "next/link";
import { Fragment } from "react";
import { useProduct } from "../_contexts/productContext";
import { useActiveVariation } from "../_contexts/variationContext";
import { ProductVariations } from "./productVariations";
import { Product } from "@/core/models/product";
import { Column } from "@/ui/layouts/column";

type FeatureMap = { name: string; value: string };
function getSummaryFeaturesOfProduct(product: Product): FeatureMap[] {
  const categoryProperty = product.properties.slice(
    0,
    product.components.length < 2 ? 1 : 2 - product.components.length,
  );
  return [
    { name: "Brand", value: product.brandModel.brandName },
    { name: "Model", value: product.brandModel.modelName },
    ...categoryProperty.map((cp) => ({ name: cp.name, value: cp.value })),
    ...product.components
      .slice(0, 2 + (!categoryProperty.length ? 1 : 0))
      .map((cmpnt) => {
        const prop = cmpnt.models.at(0)?.properties.at(0);
        return {
          name: cmpnt.name,
          value: `${prop?.value}`,
        };
      }),
  ];
}

export function ProductOverview() {
  const { activeVariation } = useActiveVariation();
  const product = useProduct();

  const summaryFeaturesOfProduct = getSummaryFeaturesOfProduct(product);

  return (
    <Column className="gap-32px p-2">
      <Column className="gap-24px">
        <h3 className="text-2xl font-semibold">{product.title}</h3>
        <div className="flex gap-4">
          <ProductScore score={product.averageScore} />
          <div className="w-px bg-gray-400"></div>
          <Caption size="lg" className="text-gray-neutral-71">
            sold 125
          </Caption>
        </div>
        <RowOnDesktopColumnOnMobile className="[&_.icon]:me-1 gap-2 space-x-2 text-gray-neutral-71">
          <Inventory inventory={activeVariation.inventory} />
          <Row>
            <Icon name="guarantee" />
            <Caption size="md">Guaranteed</Caption>
          </Row>
          <Row>
            <Icon name="truck" />
            <Caption size="md">Free Delivery</Caption>
          </Row>
        </RowOnDesktopColumnOnMobile>
        <ProductVariations />
      </Column>
      <ul className="grid grid-cols-2 gap-y-8px ps-12px">
        {summaryFeaturesOfProduct.map((feat) => (
          <Fragment key={feat.name}>
            <Row className="items-center gap-4px">
              <span className="inline-block w-1 h-1 bg-gray-600 rounded-full"></span>
              <Caption size="lg" className="text-gray-neutral-71">
                {feat.name}
              </Caption>
            </Row>
            <Caption size="lg">{feat.value}</Caption>
          </Fragment>
        ))}

        <Row className="items-center gap-4px">
          <span className="inline-block w-1 h-1 bg-transparent rounded-full"></span>
          <Link
            className="text-blue-600 text-button-sm"
            href={{ hash: "details" }}
          >
            Show more <Icon name="arrow_right" />
          </Link>
        </Row>
      </ul>
    </Column>
  );
}

function Inventory({ inventory }: { inventory: number }) {
  const isAvailable = inventory > 0;
  return (
    <Row>
      <Icon
        name="stock"
        className={isAvailable ? "fill-primary-blue-0c" : "fill-error"}
      />
      <Caption size="md" className={!isAvailable ? "text-error" : ""}>
        {isAvailable ? "in stock" : "out of stock"}
      </Caption>
    </Row>
  );
}
