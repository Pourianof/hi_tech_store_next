import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import DashboardSidebar from "./_components/dashboardSidebar";
import { auth } from "../../../auth";
import { isAdmin, isManager } from "@/lib/helpers/roleHelpers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
  dashboard: ReactNode;
}) {
  const session = await auth();

  if (
    !session?.user.roles?.length ||
    (!isManager(session.user.roles) && !isAdmin(session.user.roles))
  ) {
    redirect("/");
  }

  return (
    <Wrapper>
      <div className="flex">
        <DashboardSidebar />
        <div className="grow">{children}</div>
      </div>
    </Wrapper>
  );
}
