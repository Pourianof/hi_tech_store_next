import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { H3 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { ReactNode } from "react";

export function ItemsListBox(props: {
  label: string;
  linkLabel?: string;
  linkHref?: string;
  children: ReactNode;
}) {
  let linkChild = !!props.linkLabel?.trim() ? (
    <Row className="gap-1" center>
      <span className="text-button-lg">{props.linkLabel}</span>
      <Icon name="arrow_right" className="text-sm" />
    </Row>
  ) : null;

  if (props.linkHref) {
    linkChild = (
      <Link
        href={{ pathname: props.linkHref }}
        className="hover:text-primary-blue-0c hover:fill-primary-blue-0c"
      >
        {linkChild}
      </Link>
    );
  }

  return (
    <Column>
      <Row className="justify-between py-2 border-b-2" centerV>
        <H3 className="font-semibold text-lg">{props.label}</H3>
        {linkChild}
      </Row>
      <div>{props.children}</div>
    </Column>
  );
}
