import { routes } from "@/app/routes";
import { Redirector } from "@/ui/redirector";

export default function SuccessPaymentPage() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="bg-slate-500 p-2 rounded text-slate-50">
        Payment done{" "}
        <span className="inline-block bg-green-600 px-1 py-0.5 rounded mx-0.5">
          successfully
        </span>
      </h1>
      <div className="bg-stone-500 text-white/90 my-2 rounded p-2">
        <div>Thank you for your buying</div>
        <div>We will do our best to satisfy you.</div>
        <div>Your order will arrive at your doorstep on time</div>
      </div>
      <p>Redirecting to main page ...</p>
      <Redirector destinationPath={routes.main} timeout={3000} />
    </div>
  );
}
