import { PageTitle } from "../../_components/pageTitle";
import { EditableInput } from "../../_components/EditableInput";
import { FullNameInput } from "./_components/FullNameInput";

export default async function AccountPersonalDataPage() {
  return (
    <div>
      <PageTitle title="Identification" description="Verify your identitys" />
      <div className="grid grid-cols-2 gap-2">
        <FullNameInput />
        <EditableInput iconName="email" label="E-mail Address" />
        <EditableInput
          iconName="phone"
          label="Phone number"
          value={"No-Number"}
        />
        <EditableInput
          iconName="key"
          label="Password"
          value={"***************"}
        />
        <EditableInput iconName="home" label="Address" value={"No-Address"} />
        <EditableInput
          iconName="postal"
          label="Postal code"
          value={"No-Postal"}
        />
      </div>
    </div>
  );
}
