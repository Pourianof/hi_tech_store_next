"use client";
import { Product } from "@/core/models/product";
import { useCart } from "@/ui/contexts/cart/cartContext";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Badge } from "@mui/material";
import Link from "next/link";

export function CartBadge() {
  const { products } = useCart();
  return (
    <div className="relative hover:[&>.cart-box]:opacity-100 hover:[&>.cart-box]:visible">
      <div className="p-4 text-sm shadow-standard rounded-xl cart-box invisible opacity-0 duration-200 transition delay-100 bg-white absolute z-20 top-full right-0">
        <h4 className="text-lg border-b">
          <Icon name="cart" />
          Your cart
        </h4>
        {!!products.length ? (
          <div className="flex flex-col gap-4 py-2 divide-y">
            {products.map((prod) => (
              <CartProductItem key={prod.product.productId} {...prod} />
            ))}
          </div>
        ) : (
          <div className="w-max relative py-8">
            <Icon
              name="order_basket"
              className="text-8xl absolute top-1/2 left-1/2 -translate-1/2 opacity-10"
            />
            <span className="text-2xl">Cart is empty</span>
          </div>
        )}
      </div>
      <Link href={{ pathname: "/cart" }}>
        <Badge
          badgeContent={products.length}
          anchorOrigin={{
            vertical: "bottom",
          }}
          max={99}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              minWidth: "15px",
              width: "15px",
              height: "15px",
              fontSize: "10px",
            },
          }}
        >
          <Icon name="order_basket" />
        </Badge>
      </Link>
    </div>
  );
}

function CartProductItem({
  amount,
  product,
}: {
  product: Product;
  amount: number;
}) {
  const { actions } = useCart();
  const coverImage = product.media?.find((m) => m.isMain)?.url;
  return (
    <div key={product.productId} className="flex gap-2">
      <ApiImage square alt={product.title} src={coverImage} width={100} />
      <div>
        <h4 className="text-sm line-clamp-2 w-max max-w-[150px]">
          {product.title}
        </h4>
        <div className="whitespace-nowrap flex items-center my-2">
          <span>${product.price}</span>
          <span className="opacity-45 text-[10px]">(×{amount})</span>
          <Icon name="arrow_forward" />
          <span className="bg-slate-300 inline-block p-0.5 rounded">
            ${product.price * amount}
          </span>
        </div>
        <div className="flex items-stretch">
          <button
            className="rounded-l border px-2 cursor-pointer hover:bg-gradient-end-blue"
            onClick={(e) => {
              e.preventDefault();
              actions.decreaseAmountOfProduct(product);
            }}
          >
            <Icon name="remove" />
          </button>
          <span className="text-center inline-block w-[40px] border-t border-b px-1 py-1 outline-none focus:bg-gradient-end-blue">
            {amount}
          </span>
          <button
            className="rounded-r border px-2 cursor-pointer hover:bg-gradient-end-blue me-2"
            onClick={(e) => {
              e.preventDefault();
              actions.addProductToCart(
                {
                  product: product,
                  amount: 1,
                },
                false
              );
            }}
          >
            <Icon name="add" />
          </button>
          <button
            className="ms-auto cursor-pointer h-[30px] aspect-square hover:bg-gray-200 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              actions.removeProductFromCart(product);
            }}
          >
            <Icon name="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
