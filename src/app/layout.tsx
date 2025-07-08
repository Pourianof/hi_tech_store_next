import { Header } from "./_components/header";
import "./_styles/global.css";
import { ReactNode } from "react";

export default function MainLayout(props: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {props.children}
      </body>
    </html>
  );
}
