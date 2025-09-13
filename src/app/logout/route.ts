import { signOut } from "../../../auth";

export function GET() {
  return signOut({ redirect: true, redirectTo: "/" });
}
