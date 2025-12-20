import { routes } from "@/app/routes";
import { getMainMedia } from "@/core/models/helpers/productHelpers";
import { OrderWithProduct } from "@/core/models/order";
import { Product } from "@/core/models/product";
import { formatDateToYYYYDDMM } from "@/lib/helpers/dateHelper";
import { ApiImage } from "@/ui/image/ApiImage";
import Link from "next/link";

export function OrderRow({ order }: { order: OrderWithProduct }) {
  const stat = order.items.reduce(
    (pre, cur) => ({
      total: pre.total + cur.count * cur.orderPayTimePrice,
    }),
    {
      total: 0,
    }
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
        <OrderInfoSlot title={"Total"} subtitle={`$${stat.total}`} />
      </div>
      <div className="flex gap-2">
        {[...order.items, ...order.items, ...order.items, ...order.items]
          .slice(0, maxDisplayItemsCount)
          .map((item) => (
            <div
              key={item.id}
              className="max-w-1/6 min-w-1/6 relative hover:[&_.product-info]:opacity-100"
            >
              <ApiImage
                alt={item.product.title}
                src={getMainMedia(item.product as Product)?.url}
                className="w-full"
              />
              <div className="product-info space-y-2 top-0 left-0 w-full h-full text-slate-100 p-2 rounded absolute opacity-0 bg-black/60">
                <h3
                  className="text-sm font-semibold line-clamp-2 border-b border-b-white/40"
                  title={item.product.title}
                >
                  <Link
                    href={{
                      pathname: `${routes.products.forProduct(
                        item.product.productId
                      )}`,
                    }}
                  >
                    {item.product.title}
                  </Link>
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs">${item.orderPayTimePrice}</span>
                  <span className="text-xs ">×{item.count}</span>
                </div>
              </div>
            </div>
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
  subtitle: string;
}) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <span>{subtitle}</span>
    </div>
  );
}
