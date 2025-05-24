import "./_styles/global.css";
import { ReactNode } from "react";

export default function MainLayout(props: { children: ReactNode }) {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
}
