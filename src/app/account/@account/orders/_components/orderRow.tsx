import { routes } from "@/app/routes";
import {
  OrderItemWithProduct,
  OrderPaymentState,
  OrderWithProduct,
} from "@/core/models/order";
import { ProductVariation } from "@/core/models/product";
import { ProductVariationModel } from "@/core/models/productModel";
import { formatDateToYYYYDDMM } from "@/lib/helpers/dateHelper";
import { ApiImage } from "@/ui/image/ApiImage";
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
    <div className="flex flex-col">
      <div className="bg-gray-neutral-f6 flex text-center justify-between p-2 px-5">
        <OrderInfoSlot title={"Order code"} subtitle={`#${order.orderId}`} />
        <OrderInfoSlot
          title={"Placed on"}
          subtitle={formatDateToYYYYDDMM(createdDate)}
        />
        <OrderInfoSlot
          title={"Total"}
          subtitle={
            stat.discount > 0 ? (
              <div className="flex flex-col">
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
            order.paymentState == OrderPaymentState.Paid ? "Paid" : "Failed"
          }
        />
      </div>
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
    </div>
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
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <span>{subtitle}</span>
    </div>
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
      <ApiImage
        alt={`${product.title} - ${variation.color.name}`}
        src={
          ProductVariationModel.CreateWith(
            variation as ProductVariation,
          ).getCandidateImageMedia()?.url
        }
        className="w-full"
      />
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
