"use client";
import { useAuth } from "@/ui/contexts/authContext";
import Icon, { IconNames } from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Caption } from "@/ui/theme/text/caption";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { HeaderModalHoverZone } from "./headerModal";
import { Card } from "@/ui/theme/card";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";

export function UserLink() {
  const { data: session, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress size={15} />;
  }

  return (
    <HeaderModalHoverZone name="user-link" modalContent={<UserMenu />}>
      <Link
        className="flex gap-1"
        href={{ pathname: session ? "/account" : "/login" }}
      >
        {session?.user.avatarUrl ? (
          <div className="w-[28px] h-[28px] rounded-full border border-gray-400 p-[1px]">
            <ApiImage
              alt="user avatar"
              src={session.user.avatarUrl}
              className="w-full h-full object-cover rounded-full overflow-clip"
            />
          </div>
        ) : (
          <Icon name="user" />
        )}
        {!!session && (
          <Column
            center
            className="text-sm bg-gray-300 p-1 px-1.5 rounded hover:bg-gray-400 self-center"
          >
            <Caption size="md">{session.user?.firstName}</Caption>
          </Column>
        )}
      </Link>
    </HeaderModalHoverZone>
  );
}

function UserMenu() {
  const { data } = useAuth();

  return (
    <Card className="rounded-none rounded-b-md w-[290px] p-16px" noShadow>
      <Column className="gap-24px">
        <UserMenuItem
          iconName="user"
          mainText={`${data?.user.firstName} ${data?.user.lastName}`}
          subTitle={data?.user.email}
          link="/account"
        />
        <UserMenuItem
          iconName="order_basket"
          mainText="Orders"
          link="/account/orders"
        />
        <UserMenuItem iconName="exit" mainText="Log out" link="/logout" />
      </Column>
    </Card>
  );
}

function UserMenuItem({
  iconName,
  mainText,
  subTitle,
  link,
}: {
  mainText: string;
  subTitle?: string;
  iconName: IconNames;
  link: string;
}) {
  return (
    <Link className="block" href={{ pathname: link }}>
      <Row className="justify-baseline gap-2">
        <Body size="lg">
          <Icon name={iconName} />
        </Body>
        <Column>
          <Body size="lg" className={subTitle ? "text-primary-blue-0c" : ""}>
            {mainText}
          </Body>
          {!!subTitle && <Body size="sm">{subTitle}</Body>}
        </Column>
      </Row>
    </Link>
  );
}
