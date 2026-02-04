import { CartItem } from "@/core/models/cartItem";
import { getMainMedia } from "@/core/models/helpers/productHelpers";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { priceFormatter } from "@/ui/helpers/priceFormatter";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";

export function CartItemBox({
  cartItem,
  variant = "mini",
}: {
  cartItem: CartItem;
  variant?: "large" | "mini";
}) {
  const { actions } = useCart();
  const { product, amount, variation } = cartItem;
  const coverImage = getMainMedia(cartItem.product, variation)?.url;

  let titleClassName: string;
  switch (variant) {
    case "large": {
      titleClassName = "text-lg";
      break;
    }
    case "mini": {
      titleClassName = "text-sm";
      break;
    }
  }

  return (
    <div key={product.productId} className="flex gap-2 py-2">
      <ApiImage
        className="min-w-[40%] w-[40%]"
        square
        alt={product.title}
        src={coverImage}
      />
      <div>
        <h4 className={"line-clamp-2 w-full font-semibold " + titleClassName}>
          {product.title}
        </h4>
        <div className="whitespace-nowrap flex items-center my-2">
          <div className="flex flex-col">
            {!!product.discount && (
              <>
                <span className="text-gray-300 text-xs space-x-1">
                  <span className="line-through">
                    ${priceFormatter(cartItem.variation.price)}
                  </span>
                  <span className="text-orange-400 text-xs">
                    {product.discount}%
                  </span>
                </span>
              </>
            )}

            <span>${priceFormatter(cartItem.getPayingProductPrice())}</span>
          </div>
          <span className="opacity-45 text-[10px]">(×{amount})</span>
          <Icon name="arrow_forward" />
          <span className="bg-slate-300 inline-block p-0.5 rounded">
            ${priceFormatter(cartItem.finalPrice)}
          </span>
        </div>
        <div className="flex items-stretch">
          <button
            className="rounded-l border px-2 cursor-pointer hover:bg-gradient-end-blue"
            onClick={(e) => {
              e.preventDefault();
              actions.decreaseAmountOfProduct({
                product,
                variation,
                amount: -1,
              });
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
                  product,
                  variation,
                  amount: 1,
                },
                false,
              );
            }}
          >
            <Icon name="add" />
          </button>
          <button
            className="ms-auto cursor-pointer h-[30px] aspect-square hover:bg-gray-200 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              actions.removeProductFromCart({
                product,
                variation: variation,
              });
            }}
          >
            <Icon name="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
