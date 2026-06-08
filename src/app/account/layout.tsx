import React, { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import { AccountSideBar } from "./_components/accountSidebar";
import { protectRoute } from "@/lib/helpers/protectRoute";
import { Row } from "@/ui/layouts/row";
import { DisplayOnRoute } from "../../ui/displayOnRoute";

export default async function AccountPageLayout({
  account,
}: {
  children: ReactNode;
  account: ReactNode;
}) {
  await protectRoute();

  return (
    <Wrapper>
      <Row>
        <DisplayOnRoute root endsWith="account">
          <AccountSideBar />
        </DisplayOnRoute>
        <DisplayOnRoute endsWith="account">
          <div className="p-4 grow">{account}</div>
        </DisplayOnRoute>
      </Row>
    </Wrapper>
  );
}
