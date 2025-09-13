import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import Icon, { IconNames, IconThemeProvider } from "@/ui/icons/icon";

const SIDEBAR_ITEMS: { title: string; iconName: IconNames }[] = [
  { title: "Personal Data", iconName: "user_edit" },
  { title: "Payment & Instalments", iconName: "dollar" },
  { title: "Orders", iconName: "order_basket" },
  { title: "Wish list", iconName: "heart_outline" },
  { title: "Discounts", iconName: "gift" },
  { title: "Security & access", iconName: "security" },
  { title: "Notification", iconName: "bell" },
  { title: "Contact us", iconName: "support24" },
  { title: "Log out", iconName: "exit" },
];

export async function AccountSideBar() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-100 w-fit p-4">
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

function SidebarItem({
  iconName,
  title,
}: {
  title: string;
  iconName: IconNames;
}) {
  return (
    <div className="py-4">
      <Icon name={iconName} />
      <span className={iconName == "exit" ? "text-red-600" : ""}>{title}</span>
    </div>
  );
}
