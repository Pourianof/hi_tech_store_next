import Icon from "@/ui/icons/icon";
import { EditableInput } from "../../_components/EditableInput";
import { PageTitle } from "../../_components/pageTitle";
import Link from "next/link";

export default function AccountPaymentsSettingsPage() {
  return (
    <div className="relative">
      <div className="absolute text-6xl text-white font-semibold flex items-center justify-center bg-black/25 top-0 left-0 right-0 bottom-0">
        Soon
      </div>
      <div>
        <PageTitle title="Cards" description="manage payment methods" />
        <div className="flex items-center  gap-1">
          <EditableInput value="Credit or Debit cards" />
          <Icon name="american_express" className="text-6xl" />
          <Icon name="master_card" className="text-6xl" />
          <Icon name="visa" className="text-6xl" />
        </div>
        <div className="flex items-center gap-2">
          <EditableInput value="Paypal" />
          <Icon name="paypal" className="text-6xl" />
        </div>
      </div>
      <div className="my-4">
        <h4 className="font-semibold">Instalments</h4>
        <Link href="/instalments" className="text-blue-500 text-sm">
          Manage your instalment <Icon name="arrow_right" />
        </Link>
      </div>
    </div>
  );
}
