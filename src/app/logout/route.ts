import { logoutApi } from "@/api/authApi";
import { auth, signOut } from "../../../auth";
import { encryptHelper } from "@/lib/utils/encryptor";

export async function GET() {
  const authState = await auth();
  if (authState) {
    const refToken = encryptHelper.decrypt(authState.refreshToken);

    const result = await logoutApi(refToken);

    if (result.status != "success") {
      return;
    }
  }
  return signOut({ redirect: true, redirectTo: "/" });
}
