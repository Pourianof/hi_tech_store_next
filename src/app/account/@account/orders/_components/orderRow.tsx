import { routes } from "@/app/routes";
import {
  OrderItemWithProduct,
  OrderPaymentState,
  OrderWithProduct,
} from "@/core/models/order";
import { ProductVariation } from "@/core/models/product";
import { ProductVariationModel } from "@/core/models/productModel";
import { formatDateToYYYYDDMM } from "@/lib/helpers/dateHelper";
import { CustomImage } from "@/ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { RowOnDesktopColumnOnMobile } from "@/ui/layouts/rownOnDesktopColumnOnMobile";
import { Body } from "@/ui/theme/text/body";
import { H6 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { ReactNode } from "react";

export function OrderRow({ order }: { order: OrderWithProduct }) {
  const stat = order.items.reduce(
    (pre, cur) => ({
      total: pre.total + cur.count * cur.productVariation.price,
      discount: pre.discount + (cur.discount ?? 0),
    }),
    {
      total: 0,
      discount: 0,
    },
  );

  const createdDate = new Date(order.createdAt);
  const maxDisplayItemsCount = 5;
  return (
    <Column className="gap-16px">
      <RowOnDesktopColumnOnMobile className="desktop:bg-gray-neutral-f6 text-center justify-between p-16px px-5">
        <OrderInfoSlot title={"Order code"} subtitle={`#${order.orderId}`} />
        <OrderInfoSlot
          title={"Placed on"}
          subtitle={formatDateToYYYYDDMM(createdDate)}
        />
        <OrderInfoSlot
          title={"Total"}
          subtitle={
            stat.discount > 0 ? (
              <div className="flex flex-row-reverse desktop:flex-col justify-center ">
                <span className="line-through text-xs">{stat.total}$</span>
                <span className="font-semibold">
                  {stat.total - stat.discount}$
                </span>
              </div>
            ) : (
              `$${stat.total}`
            )
          }
        />
        <OrderInfoSlot
          title={"Status"}
          subtitle={
            order.paymentState == OrderPaymentState.Paid ? (
              <Body
                size="sm"
                className="rounded text-success bg-success-light border border-success px-2 py-0.5"
              >
                Paid
              </Body>
            ) : (
              <Body
                size="sm"
                className="rounded text-error bg-error-light border border-error px-2 py-0.5"
              >
                Failed
              </Body>
            )
          }
        />
      </RowOnDesktopColumnOnMobile>
      <div className="flex gap-2">
        {order.items.slice(0, maxDisplayItemsCount).map((item) => (
          <OrderItemsListItem key={item.id} orderItem={item} />
        ))}
        {order.items.length > maxDisplayItemsCount && (
          <span className="font-semibold inline-block p-2 self-center">
            +{order.items.length - maxDisplayItemsCount}
          </span>
        )}
      </div>
    </Column>
  );
}

function OrderInfoSlot({
  subtitle,
  title,
}: {
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <Row className="gap-24px desktop:flex-col">
      <H6 className="bg-gray-neutral-f6 px-2 py-1 desktop:bg-transparent w-[120px] desktop:w-auto text-left">
        {title}
      </H6>
      <Body size="lg">{subtitle}</Body>
    </Row>
  );
}

function OrderItemsListItem({
  orderItem: {
    productVariation: { product, ...variation },
    orderPayTimePrice,
    count,
  },
}: {
  orderItem: OrderItemWithProduct;
}) {
  return (
    <div className="max-w-1/6 min-w-1/6 relative hover:[&_.product-info]:opacity-100">
      <div className="h-full aspect-square rounded-lg overflow-clip">
        <CustomImage
          alt={`${product.title} - ${variation.color.name}`}
          src={
            ProductVariationModel.CreateWith(
              variation as ProductVariation,
            ).getCandidateImageMedia()?.url
          }
          className="w-full object-cover h-full"
        />
      </div>
      <div className="product-info space-y-2 top-0 left-0 w-full h-full text-slate-100 p-2 rounded absolute opacity-0 bg-black/60">
        <h3
          className="text-sm font-semibold line-clamp-2 border-b border-b-white/40"
          title={product.title}
        >
          <Link
            href={{
              pathname: `${routes.products.forProduct(product.productId)}`,
            }}
          >
            {product.title}
          </Link>
        </h3>
        <div className="flex gap-2">
          <span className="text-xs">${orderPayTimePrice}</span>
          <span className="text-xs ">×{count}</span>
        </div>
      </div>
    </div>
  );
}
