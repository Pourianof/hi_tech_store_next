import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import Icon from "@/ui/icons/icon";
import Link from "next/link";

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html>
      <body>
        <Header />
        <SessionProvider session={session}>
          {props.children}
          {props.auth}
        </SessionProvider>
        <Toaster position="bottom-center" gutter={10} />
        {session?.user?.role?.toLowerCase() == "manager" && (
          <Link
            href="/dashboard"
            className="fixed cursor-pointer bg-gray-100 right-4 bottom-4 p-4 hover:shadow-xs shadow-lg shadow-black/30 rounded-full"
          >
            <Icon name="cms" className="text-4xl fill-[#323e81]" />
          </Link>
        )}
      </body>
    </html>
  );
}
