"use client";
import Icon, { IconNames } from "@/ui/icons/icon";
import { usePathname } from "next/navigation";

export function PaymentStagesPath() {
  const pathname = usePathname().toLowerCase();

  const isCartPage = pathname.endsWith("cart");
  const isCheckoutPage = pathname.endsWith("checkout");
  const isPaymentPage = pathname.endsWith("payment");

  return (
    <div className="flex mb-8 items-center px-4 gap-[4px] desktop:w-1/2 mx-auto">
      <CheckoutStageIcon
        iconName="order_basket"
        label="Cart"
        state={isCartPage ? "active" : "done"}
      />
      <PathLine />
      <CheckoutStageIcon
        iconName="truck"
        label="Checkout"
        state={isCheckoutPage ? "active" : isCartPage ? "waiting" : "done"}
      />
      <PathLine />
      <CheckoutStageIcon
        iconName="card"
        label="Payment"
        state={isPaymentPage ? "active" : "waiting"}
      />
    </div>
  );
}

function PathLine() {
  return <div className="grow h-[1px] bg-gray-neutral-9e"></div>;
}

function CheckoutStageIcon({
  iconName,
  label,
  state = "waiting",
}: {
  iconName: IconNames;
  label: string;
  state?: "active" | "done" | "waiting";
}) {
  return (
    <div
      className={
        "relative flex flex-col aspect-square p-1 rounded-full items-center justify-center " +
        (state == "active"
          ? "w-[60px] border-2 border-primary-blue-0c text-4xl [&_svg]:fill-primary-blue-0c"
          : "w-[50px] text-3xl [&_svg]:fill-white " +
            (state == "done"
              ? "bg-primary-blue-0c opacity-60"
              : "bg-gray-neutral-9e"))
      }
    >
      <Icon name={iconName} />
      <span
        className={
          "absolute -bottom-1 translate-y-full font-medium " +
          (state == "active"
            ? "text-primary-blue-0c text-base"
            : "text-sm " +
              (state == "done"
                ? "text-primary-blue-0c"
                : "text-gray-neutral-9e"))
        }
      >
        {label}
      </span>
    </div>
  );
}
