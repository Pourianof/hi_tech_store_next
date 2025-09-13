import React, { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import { AccountSideBar } from "./_components/accountSidebar";

export default function AccountPageLayout({
  account,
}: {
  children: ReactNode;
  account: ReactNode;
}) {
  return (
    <Wrapper>
      <div className="flex">
        <AccountSideBar />
        <div className="p-4 grow">{account}</div>
      </div>
    </Wrapper>
  );
}
