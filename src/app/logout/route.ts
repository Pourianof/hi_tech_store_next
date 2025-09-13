import { signOut } from "../../../auth";

export async function GET() {
  return signOut({ redirect: true, redirectTo: "/" });
}
