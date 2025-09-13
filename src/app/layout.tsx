import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

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
      </body>
    </html>
  );
}
