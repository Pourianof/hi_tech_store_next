import { ProductScore } from "@/app/_components/productScore";
import { Product } from "@/core/models/product";
import Icon from "@/ui/icons/icon";
import Link from "next/link";
import { Fragment } from "react";

export function ProductOverview({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h3 className="text-2xl font-semibold">{product.title}</h3>
      <div className="flex gap-4">
        <ProductScore score={product.averageScore} />
        <div className="w-[1px] bg-gray-400"></div>
        <span>sold 125</span>
      </div>
      <div className="flext gap-2 space-x-2 justify-between">
        <span>
          <Icon name="stock" />
          in stock
        </span>
        <span>
          <Icon name="guarantee" />
          Guaranteed
        </span>
        <span>
          <Icon name="truck" />
          Free Delivery
        </span>
      </div>
      <ul className="grid grid-cols-2">
        {product.properties.slice(0, 5).map((prop) => (
          <Fragment key={prop.propertyId}>
            <li className="text-gray-600 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
              {prop.name}
            </li>
            <span className="font-semibold">{prop.value}</span>
          </Fragment>
        ))}
      </ul>
      <Link className="text-blue-600" href={{ hash: "details" }}>
        Show more <Icon name="arrow_right" />
      </Link>
    </div>
  );
}
