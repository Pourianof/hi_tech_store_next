"use client";

import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { H3 } from "@/ui/theme/text/headers";
import { IconButton } from "@mui/material";
import { SubscriptionInput } from "./subscriptionInput";
import { Label } from "@/ui/form/label";
import { useState } from "react";
import { Body } from "@/ui/theme/text/body";

export function FooterExpandableMenu() {
  return (
    <Column className="gap-8">
      <Column className="gap-2 items-stretch px-4">
        <Label>
          <H3 className="text-white">Sign up for News and updates</H3>
        </Label>
        <SubscriptionInput />
      </Column>
      <Column>
        <ExpandableItem
          title="Company"
          menuItems={["about us", "blog", "returns", "order status"]}
        />
        <ExpandableItem
          title="Info"
          menuItems={["How it works?", "our promises", "FAQ"]}
        />
        <ExpandableItem
          title="Contact us"
          menuItems={[
            "123 Main Street, Anytown,USA",
            "+1 (555) 123-4567",
            "TechHeimSupport@gmail.com",
          ]}
        />
      </Column>
    </Column>
  );
}

function ExpandableItem({
  title,
  menuItems,
}: {
  title: string;
  menuItems: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Column>
      <Row className="justify-between text-white" centerV>
        <H3>{title}</H3>
        <IconButton
          onClick={() => {
            setIsExpanded((expanded) => !expanded);
          }}
        >
          <Icon
            name="arrow"
            className={
              (isExpanded ? "rotate-90" : "-rotate-90") +
              " text-white transition duration-200"
            }
          />
        </IconButton>
      </Row>
      <Column
        className={
          (isExpanded ? "h-fit opacity-100" : "h-0 opacity-0") +
          " gap-1 pb-4 overflow-hidden"
        }
      >
        {menuItems.map((item) => (
          <Body size="md" key={item}>
            {item}
          </Body>
        ))}
      </Column>
    </Column>
  );
}
