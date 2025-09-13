import { Toaster } from "react-hot-toast";
import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function MainLayout(props: {
  children: ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SessionProvider>
          <Header />
          {props.children}
          {props.auth}
          <Toaster position="bottom-center" gutter={10} />
        </SessionProvider>
      </body>
    </html>
  );
}
