import Icon, { IconNames } from "@/ui/icons/icon";
import { CartList } from "./_components/cartList";

function PathLine() {
  return <div className="grow h-[1px] bg-gray-neutral-9e"></div>;
}

export default function DefaultCartPage() {
  return (
    <div>
      <div>
        <div className="flex items-center px-4 gap-[4px]">
          <CheckoutStageIcon
            iconName="order_basket"
            isActive={true}
            label="Cart"
          />
          <PathLine />
          <CheckoutStageIcon iconName="truck" label="Checkout" />
          <PathLine />
          <CheckoutStageIcon iconName="card" label="Payment" />
        </div>
        <CartList />
      </div>
    </div>
  );
}

function CheckoutStageIcon({
  iconName,
  label,
  isActive = false,
}: {
  iconName: IconNames;
  label: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={
        "relative flex flex-col aspect-square p-1 rounded-full items-center justify-center " +
        (isActive
          ? "w-[60px] border-2 border-primary-blue-0c text-4xl [&_svg]:fill-primary-blue-0c"
          : "w-[50px] bg-gray-neutral-9e text-3xl [&_svg]:fill-white")
      }
    >
      <Icon name={iconName} />
      <span
        className={
          "absolute -bottom-1 translate-y-full font-medium " +
          (isActive
            ? "text-primary-blue-0c text-base"
            : "text-sm text-gray-neutral-9e")
        }
      >
        {label}
      </span>
    </div>
  );
}
