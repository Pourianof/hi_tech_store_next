import { ReactNode } from "react";
import localFont from "next/font/local";

export const techIconsFont = localFont({
  src: [
    {
      path: "../../../public/fonts/tech_heim_outline.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function Icon(props: { children: ReactNode }) {
  return (
    <i className={`not-italic ${techIconsFont.className}`}>{props.children}</i>
  );
}
