import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default async function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        <SessionProvider>
          {props.children}
          {props.auth}
        </SessionProvider>
        <Toaster position="bottom-center" gutter={10} />
      </body>
    </html>
  );
}
