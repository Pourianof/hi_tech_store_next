import { redirect } from "next/navigation";
import Icon, { IconNames, IconThemeProvider } from "@/ui/icons/icon";
import { SidebarItem } from "./sidebarItem";
import { auth } from "../../../../auth";

const SIDEBAR_ITEMS: { title: string; iconName: IconNames; href: string }[] = [
  { title: "Personal Data", iconName: "user_edit", href: "/personal-data" },
  { title: "Payment & Instalments", iconName: "dollar", href: "/payments" },
  { title: "Orders", iconName: "order_basket", href: "/orders" },
  { title: "Wish list", iconName: "heart_outline", href: "/wish-list" },
  { title: "Discounts", iconName: "gift", href: "/discounts" },
  { title: "Security & access", iconName: "security", href: "/security" },
  { title: "Notification", iconName: "bell", href: "/notification" },
  { title: "Contact us", iconName: "support24", href: "/contact-us" },
  { title: "Log out", iconName: "exit", href: "/" },
];

export async function AccountSideBar() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-100 w-fit">
      <IconThemeProvider theme={{ className: "pe-2" }}>
        <div className="cursor-default py-2 border-b border-gray-400">
          <Icon className="text-4xl" name="profile" />
          {session.user?.name}
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem key={item.iconName} {...item} />
        ))}
      </IconThemeProvider>
    </div>
  );
}
