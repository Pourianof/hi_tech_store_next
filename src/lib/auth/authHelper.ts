import { auth } from "../../../auth";
import { UserModel } from "./userModel";

export async function authData() {
  const session = await auth();

  if (!session) return null;

  return {
    ...session,
    user: UserModel.build(session.user),
  };
}
