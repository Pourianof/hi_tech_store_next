import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session) {
    const searchParams = new URLSearchParams();
    searchParams.append("redirect", `/order/checkout`);
    redirect(`/auth/login?${searchParams.toString()}`);
  }

  return <div>CHECKOUT</div>;
}
