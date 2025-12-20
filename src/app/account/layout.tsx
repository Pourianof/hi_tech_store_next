import React, { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import { AccountSideBar } from "./_components/accountSidebar";
import { protectRoute } from "@/lib/helpers/protectRoute";

export default async function AccountPageLayout({
  account,
}: {
  children: ReactNode;
  account: ReactNode;
}) {
  await protectRoute();

  return (
    <Wrapper>
      <div className="flex">
        <AccountSideBar />
        <div className="p-4 grow">{account}</div>
      </div>
    </Wrapper>
  );
}
