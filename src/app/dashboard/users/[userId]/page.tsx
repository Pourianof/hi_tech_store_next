"use client";

import { Redirector } from "@/ui/redirector";
import { usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname();
  <Redirector timeout={0} destinationPath={`${path}/permissions`} />;
}
