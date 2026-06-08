import React, { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import { AccountSideBar } from "./_components/accountSidebar";
import { protectRoute } from "@/lib/helpers/protectRoute";
import { Row } from "@/ui/layouts/row";
import { DisplayOn } from "./layout.client";

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
        <DisplayOn root>
          <AccountSideBar />
        </DisplayOn>
        <DisplayOn>
          <div className="p-4 grow">{account}</div>
        </DisplayOn>
      </Row>
    </Wrapper>
  );
}
