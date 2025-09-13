import Icon, { IconNames } from "@/ui/icons/icon";
import { auth } from "../../../../../auth";

export default async function AccountPersonalDataPage() {
  const { user } = (await auth())!;
  return (
    <div>
      <h3 className="font-semibold text-xl">Identification</h3>
      <span className="text-gray-500">Verify your identity</span>
      <div className="grid text-sm grid-cols-2 gap-2 text-gray-500">
        <InfoInput iconName="user" title="Full name" value={user?.name} />
        <InfoInput
          iconName="email"
          title="E-mail Address"
          value={user?.email}
        />
        <InfoInput iconName="phone" title="Phone number" value={"No-Number"} />
        <InfoInput iconName="key" title="Password" value={"***************"} />
        <InfoInput iconName="home" title="Address" value={"No-Address"} />
        <InfoInput iconName="postal" title="Postal code" value={"No-Postal"} />
      </div>
    </div>
  );
}

function InfoInput({
  title,
  value,
  iconName,
}: {
  iconName: IconNames;
  title: string;
  value?: string | null;
}) {
  return (
    <div>
      <label className="ms-3 text-[0.7rem]">{title}</label>
      <div className="bg-gray-100 p-2 rounded grid grid-cols-[auto_1fr_auto] items-center gap-1">
        <Icon name={iconName} />
        <span className="overflow-hidden">
          <input
            className="max-w-full text-ellipsis"
            disabled
            value={value ?? ""}
            type="text"
            readOnly={true}
          />
        </span>
        <Icon name="edit" />
      </div>
    </div>
  );
}
