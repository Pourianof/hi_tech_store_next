import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import DashboardSidebar from "./_components/dashboardSidebar";
import { auth } from "../../../auth";
import { isAdmin, isManager } from "@/lib/helpers/roleHelpers";
import { redirect } from "next/navigation";
import { Row } from "@/ui/layouts/row";

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
      <Row className="flex gap-24px">
        <DashboardSidebar />
        <div className="grow">{children}</div>
      </Row>
    </Wrapper>
  );
}
