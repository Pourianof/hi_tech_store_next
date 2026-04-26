"use client";
import { useIsDesktopScreen } from "../theme/helpers/isDesktopMode";
import { Row } from "./row";
import { Column } from "./column";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
};

export function RowOnDesktopColumnOnMobile(props: Props) {
  const isDesktopScreen = useIsDesktopScreen();
  console.log(isDesktopScreen);
  return isDesktopScreen ? <Row {...props} /> : <Column {...props} />;
}
