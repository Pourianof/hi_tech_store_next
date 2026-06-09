import { ReactNode } from "react";
import { Wrapper } from "../_shared/wrapper";
import DashboardSidebar from "./_components/dashboardSidebar";
import { auth } from "../../../auth";
import { isAdmin, isManager } from "@/lib/helpers/roleHelpers";
import { redirect } from "next/navigation";
import { Row } from "@/ui/layouts/row";
import { DisplayOnRoute } from "@/ui/displayOnRoute";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
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
        <DisplayOnRoute root endsWith="dashboard">
          <DashboardSidebar />
        </DisplayOnRoute>
        <DisplayOnRoute endsWith="dashboard">
          <div className="grow w-full">{children}</div>
        </DisplayOnRoute>
      </Row>
    </Wrapper>
  );
}
