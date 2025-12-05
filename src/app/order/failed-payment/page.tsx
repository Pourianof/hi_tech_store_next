import { routes } from "@/app/routes";
import { Redirector } from "@/ui/redirector";

export default function SuccessPaymentPage() {
  return (
    <div className="flex justify-center items-center flex-col bg-slate-300 w-fit mx-auto p-3 rounded-lg gap-1">
      <h1 className="bg-red-500 text-white/90 inline-block p-1 py-0.5 rounded">
        Payment has failed
      </h1>
      <div>Something went wrong on payment stage</div>
      <Redirector
        destinationPath={routes.order.paymentConfirmation}
        timeout={3000}
      />
    </div>
  );
}
