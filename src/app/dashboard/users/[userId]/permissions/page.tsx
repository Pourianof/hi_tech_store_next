import { getUserById } from "@/api/userApi";
import { FailedBox } from "@/app/_components/failedBox";
import { authData } from "@/lib/auth/authHelper";
import { Params } from "next/dist/server/request/params";
import { redirect } from "next/navigation";
import { PermissionFormHandler } from "./_components/permissionFormHandler";
import { StaticDataInjector } from "@/ui/contexts/StaticDataInjector";

export default async function Page({ params }: { params: Params }) {
  const { userId } = await params;
  const session = await authData();

  if (!session?.user) {
    redirect("/dashboard");
  }

  const targetUserResult = await getUserById(userId as string);

  if (targetUserResult.status == "failed") {
    return (
      <FailedBox
        title="Failed to load user"
        message={targetUserResult.data.title}
      />
    );
  }

  return (
    <StaticDataInjector data={targetUserResult.data} dataKey="target-user">
      <PermissionFormHandler />
    </StaticDataInjector>
  );
}
