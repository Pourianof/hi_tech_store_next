import Icon, { IconNames, IconThemeProvider } from "@/ui/icons/icon";
import { SafeImage } from "@/ui/image/safeImage";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { SidebarItem } from "./sidebarItem";
import { Row } from "@/ui/layouts/row";
import { H4 } from "@/ui/theme/text/headers";
import { getApiSrc } from "@/ui/image/getApiImageSrc";
import Link from "next/link";
import { Column } from "@/ui/layouts/column";

const SIDEBAR_ITEMS: { title: string; iconName: IconNames; href: string }[] = [
  { title: "Personal Data", iconName: "user_edit", href: "/personal-data" },
  { title: "Payment & Instalments", iconName: "dollar", href: "/payments" },
  { title: "Orders", iconName: "order_basket", href: "/orders" },
  { title: "Wish list", iconName: "heart_outline", href: "/wish-list" },
  { title: "Discounts", iconName: "gift", href: "/discounts" },
  { title: "Security & access", iconName: "security", href: "/security" },
  { title: "Notification", iconName: "bell", href: "/notification" },
  { title: "Contact us", iconName: "support24", href: "/contact-us" },
  { title: "Log out", iconName: "exit", href: "/logout" },
];

export async function AccountSideBar() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="desktop:bg-gray-100 grow desktop:min-w-[290px] self-start text-gray-neutral-2d">
      <IconThemeProvider theme={{ className: "pe-2" }}>
        <Row
          className="cursor-default justify-between mb-8 py-2 desktop:border-b border-gray-400 gap-4 bg-gray-neutral-f9 desktop:bg-transparent rounded-lg"
          centerV
        >
          <Row centerV>
            <SafeImage
              alt="user profile"
              src={getApiSrc(session.user.avatarUrl) ?? "/images/user.jpg"}
              className="w-9 h-9 rounded-full overflow-clip"
            />
            <H4>
              {" "}
              {session.user.firstName} {session.user.lastName}
            </H4>
          </Row>
          <Link
            href={{ pathname: "/account/personal-data" }}
            className="text-button-sm text-primary-blue-0c desktop:hidden"
          >
            <Icon name="edit" className="fill-primary-blue-0c" />
            Personal data
          </Link>
        </Row>
        <Column className="[&_>_div:first-child]:hidden desktop:[&_>_div:first-child]:block">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.iconName}
              {...item}
              notPrependHref={item.href == "/logout"}
            />
          ))}
        </Column>
      </IconThemeProvider>
    </div>
  );
}
