import { PageTitle } from "../../_components/pageTitle";
import { EditableInput } from "../../_components/EditableInput";
import { FullNameInput } from "./_components/FullNameInput";
import { EditableEmailInput } from "./_components/EmailInput";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { ProfileInput } from "./_components/profileInput";

export default async function AccountPersonalDataPage() {
  return (
    <Column>
      <PageTitle title="Identification" description="Verify your identitys" />
      <div className="grid grid-cols-2 gap-2">
        <FullNameInput />
        <EditableEmailInput />
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
      <Row>
        <ProfileInput />
      </Row>
    </Column>
  );
}
