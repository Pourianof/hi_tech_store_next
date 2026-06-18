"use client";

import { Category } from "@/core/models/category";
import { useCategories } from "@/ui/contexts/categoriesContext";
import { CustomImage } from "@/ui/image/CustomImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H4, H6 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { useState } from "react";

export function ProductsMenu() {
  const categories = useCategories();
  const [hoveredCategory, setHoveredCategory] = useState<Category>(
    categories.categories!.at(0)!,
  );

  if (!categories.categories?.length) {
    return (
      <Column>
        <H4>No category exist</H4>
        <Caption size="md">Maybe something went wrong</Caption>
      </Column>
    );
  }

  return (
    <Card
      noShadow
      className="rounded-none rounded-b-md w-full p-0 h-[calc(100dvh/3)] overflow-clip"
    >
      <Row className="h-full">
        <Column className="overflow-auto h-full self-stretch gap-16px p-24px border-r border-r-gray-neutral-9e w-max">
          {categories.categories.map((c) => (
            <Link
              key={c.categoryId}
              onMouseEnter={() => setHoveredCategory(c)}
              className="block"
              href={{
                pathname: `/products`,
                search: `category=${c.categoryId}`,
              }}
            >
              <Row
                className={[
                  "gap-16px",
                  c.categoryId == hoveredCategory.categoryId
                    ? "text-primary-blue-0c "
                    : "",
                ].join(" ")}
                centerV
              >
                <CustomImage alt={c.name} src={c.icon} square />
                <Body size="lg">{c.name}</Body>
              </Row>
            </Link>
          ))}
        </Column>
        <CategoryDetailView category={hoveredCategory} />
      </Row>
    </Card>
  );
}

function CategoryDetailView({ category }: { category: Category }) {
  return (
    <Column className="p-24px">
      <Row centerV className="gap-16px">
        <div className="w-[200px] aspect-square">
          <CustomImage
            alt={category.name}
            src={category.image}
            className="w-full h-full object-cover"
          />
        </div>
        <Column className="gap-8px">
          <H4>{category.name}</H4>
          <Caption size="md">{category.description}</Caption>
          {!!category.properties.length && (
            <Column className="gap-1">
              <H6>Properties</H6>
              <Row className="flex-wrap gap-1">
                {category.properties.map((p) => (
                  <Row
                    key={p.propertyId}
                    className="rounded-lg border border-primary-blue-27 px-2 py-1"
                  >
                    <Body size="sm">{p.name}</Body>
                  </Row>
                ))}
              </Row>
            </Column>
          )}
          {!!category.components.length && (
            <Column className="gap-1">
              <H6>Components</H6>
              <Row className="flex-wrap gap-1">
                {category.components.map((c) => (
                  <Row
                    key={c.componentTypeId}
                    className="rounded-lg border border-primary-blue-27 px-2 py-1"
                  >
                    <Body size="sm">{c.name}</Body>
                  </Row>
                ))}
              </Row>
            </Column>
          )}
        </Column>
      </Row>
    </Column>
  );
}
