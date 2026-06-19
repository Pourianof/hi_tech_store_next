import { CartItem } from "@/core/models/cartItem";
import { useCart } from "@/ui/contexts/cart/cartContext";
import { priceFormatter } from "@/ui/helpers/priceFormatter";
import Icon from "@/ui/icons/icon";
import { CustomImage } from "@/ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H6 } from "@/ui/theme/text/headers";

export function CartItemBox({
  cartItem,
  variant = "mini",
}: {
  cartItem: CartItem;
  variant?: "large" | "mini";
}) {
  const { actions } = useCart();
  const { product, amount, variation } = cartItem;
  const coverImage =
    cartItem.productVariationModel.getCandidateImageMedia()?.url;

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
    <Card noHoverReaction key={product.productId} className="px-16px py-8px">
      <Row className="gap-24px">
        <CustomImage
          className="rounded overflow-clip object-cover min-w-[40%] w-[40%] aspect-square desktop:w-[30%]"
          square
          alt={product.title}
          src={coverImage}
        />
        <Column className="gap-y-24px">
          <H6 className={"line-clamp-2 w-full" + titleClassName}>
            {product.title}
          </H6>
          <Row centerV className="gap-1">
            <div
              className="w-6 aspect-square rounded-full"
              style={{ backgroundColor: `#${variation.color.code}` }}
            ></div>
            <Caption size="sm" className="text-gray-neutral-71">
              {variation.color.name}
            </Caption>
          </Row>
          <Row className="whitespace-nowrap" centerV>
            <Column>
              {!!cartItem.variation.discount && (
                <>
                  <span className="text-gray-300 text-xs space-x-1">
                    <span className="line-through">
                      ${priceFormatter(cartItem.variation.price)}
                    </span>
                    <span className="text-orange-400 text-xs">
                      {cartItem.variation.discount}%
                    </span>
                  </span>
                </>
              )}

              <Body size="sm">
                ${priceFormatter(cartItem.getPayingProductPrice())}
              </Body>
            </Column>
            <Body size="xs" className="opacity-45">
              (×{amount})
            </Body>
            <Icon name="arrow_forward" />
            <Body size="md" className="bg-slate-300 inline-block p-0.5 rounded">
              ${priceFormatter(cartItem.finalPrice)}
            </Body>
          </Row>
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
        </Column>
      </Row>
    </Card>
  );
}
