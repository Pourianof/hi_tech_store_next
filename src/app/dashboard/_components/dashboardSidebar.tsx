import Icon, { IconNames } from "@/ui/icons/icon";
import Link from "next/link";
import { auth } from "../../../../auth";

export default async function DashboardSidebar() {
  return (
    <div>
      <SidebarHeader />
      <ul className="bg-gray-300 p-4 [&_li]:my-1.5 rounded">
        <li className="font-semibold">
          <Link href="/dashboard">Overview</Link>
        </li>
        <SidebarProductItem />
        <SidebarCategoryItem />
        <SidebarDiscountItem />
      </ul>
    </div>
  );
}

async function SidebarHeader() {
  const session = await auth();

  return (
    <h3 className="my-1">
      <Icon className="text-4xl me-1" name="profile" />
      Hello{" "}
      <span className="bg-gray-300 inline-block rounded py-0.5 px-1">
        {session?.user.name} {session?.user.lastName}
      </span>
    </h3>
  );
}

function SidebarProductItem() {
  return (
    <SidebarItem
      title="Products"
      iconName="product"
      subList={[
        {
          title: "Add new product",
          path: "/dashboard/add-product",
        },
        {
          title: "My products",
          path: "/dashboard/my-products",
        },
      ]}
    />
  );
}

function SidebarCategoryItem() {
  return (
    <SidebarItem
      title="Categories"
      iconName="category"
      link="/dashboard/categories"
    />
  );
}

function SidebarDiscountItem() {
  return (
    <SidebarItem
      title="Discounts"
      iconName="discount"
      link="/dashboard/discount-panel"
      subList={[
        { title: "Discount codes", path: "discount-panel/discount-codes" },
        { title: "Product discounts", path: "discount-panel/product-discount" },
      ]}
    />
  );
}

function SidebarItem({
  title,
  link,
  iconName,
  subList,
}: {
  title: string;
  iconName: IconNames;
  link?: string;
  subList?: { title: string; path: string }[];
}) {
  return (
    <li>
      <Icon className="me-1" name={iconName} />
      <span className="text-gray-800 cursor-default font-semibold">
        {!!link ? <Link href={link}>{title}</Link> : title}
      </span>
      {!!subList && subList.length > 0 && (
        <div className="ps-2">
          <ul className="px-2 space-y-1 border-l border-l-black/50 text-blue-950">
            {subList.map((item) => (
              <li key={item.title}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
