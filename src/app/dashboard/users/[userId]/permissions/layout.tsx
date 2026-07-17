import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "User Permissions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
