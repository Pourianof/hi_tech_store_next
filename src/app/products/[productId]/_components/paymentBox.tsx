import { Product } from "@/core/models/product";
import { RadioButton } from "@/ui/form/radioButton";
import Icon from "@/ui/icons/icon";

export function PaymentBox({ product }: { product: Product }) {
  product.discount = 12;
  const hasDiscount = !!product.discount;
  const paymenyPrice =
    product.price - (product.price * (product.discount ?? 0)) / 100;

  return (
    <div className="grow shadow-light rounded-xl p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-semibold text-2xl">
            $ {Math.round(paymenyPrice).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-neutral-71">
              last price ${product.price}
            </span>
          )}
        </div>
        {hasDiscount && (
          <div className="font-semibold text-orange-600 text-xl">
            <Icon className="text-2xl" name="discount" />
            <span>-{product.discount}%</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <RadioButton name="payment" label="Pay now" />
        <RadioButton
          name="payment"
          label={
            <div className="flex flex-col">
              <span>Buy in installments</span>
              <span className="text-sm">choose your installments period</span>
            </div>
          }
        />

        <div className="flex justify-evenly cursor-default">
          {[3, 6, 12, 18].map((index) => {
            return (
              <span
                key={index}
                className="flex text-center flex-col border p-1 text-gray-neutral-9e border-gray-neutral-9e rounded"
              >
                <span>{index}</span>
                <span>Months</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <button className="text-white bg-primary-blue-300 py-2 text-center w-full rounded-lg">
          Buy now
        </button>
        <button className="text-primary-blue-300 border-[2px] border-primary-blue-300 py-2 text-center w-full rounded-lg">
          Buy now
        </button>
      </div>
    </div>
  );
}
