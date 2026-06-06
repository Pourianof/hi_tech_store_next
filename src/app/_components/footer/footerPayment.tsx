import Image from "next/image";

export function FooterPayment() {
  return (
    <div className="h-[25px] flex gap-1">
      <Image
        width={32}
        height={24}
        src="/images/payment/paypal.png"
        alt="Visa"
      />
      <Image
        width={32}
        height={24}
        src="/images/payment/american_express.png"
        alt="Visa"
      />
      <Image width={32} height={24} src="/images/payment/visa.png" alt="Visa" />
      <Image
        width={32}
        height={24}
        src="/images/payment/master_card.png"
        alt="Visa"
      />
    </div>
  );
}
