import { authData } from "@/lib/auth/authHelper";
import { PERMISSIONS } from "@/lib/auth/permissionHelper";
import Icon, { IconNames } from "@/ui/icons/icon";
import Link from "next/link";
import { auth } from "../../../../auth";

export default async function DashboardSidebar() {
  return (
    <div className="w-full desktop:min-w-1/5 desktop:w-1/5">
      <SidebarHeader />
      <ul className="bg-gray-300 p-4 [&_li]:my-1.5 rounded">
        <li className="font-semibold">
          <Link href="/dashboard">Overview</Link>
        </li>
        <SidebarProductItem />
        <SidebarCategoryItem />
        <SidebarDiscountItem />
        <UserManagementSidebarItem />
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

async function UserManagementSidebarItem() {
  const session = await authData();
  const hasGrantAccess = session?.user.hasPermission(PERMISSIONS.access.grant);

  if (!hasGrantAccess) {
    return;
  }

  return (
    <SidebarItem
      title="User management"
      iconName="user"
      subList={[{ title: "List users", path: "/dashboard/users" }]}
    />
  );
}

async function SidebarProductItem() {
  const session = await authData();
  const hasProductCreationPermission = session?.user.hasPermission(
    PERMISSIONS.product.create,
  );
  const hasProductDeleteOrEditPermission = session?.user.hasAnyPermissions([
    { code: PERMISSIONS.product.create },
    { code: PERMISSIONS.product.edit },
  ]);

  if (!hasProductCreationPermission && !hasProductDeleteOrEditPermission) {
    return null;
  }

  return (
    <SidebarItem
      title="Products"
      iconName="product"
      subList={[
        ...(hasProductCreationPermission
          ? [
              {
                title: "Add new product",
                path: "/dashboard/add-product",
              },
            ]
          : []),
        ...(hasProductDeleteOrEditPermission
          ? [
              {
                title: "My products",
                path: "/dashboard/my-products",
              },
            ]
          : []),
      ]}
    />
  );
}

async function SidebarCategoryItem() {
  const session = await authData();
  const hasProductPermission = session?.user.hasPermission(
    PERMISSIONS.product.create,
  );

  if (!hasProductPermission) {
    return null;
  }

  return (
    <SidebarItem
      title="Categories"
      iconName="category"
      link="/dashboard/categories"
    />
  );
}

async function SidebarDiscountItem() {
  const session = await authData();
  const hasDiscountPermission = session?.user.hasAnyPermissions([
    { code: PERMISSIONS.discount.view },
    { code: PERMISSIONS.discount.create },
    { code: PERMISSIONS.discount.delete },
    { code: PERMISSIONS.discount.edit },
  ]);

  if (!hasDiscountPermission) {
    return null;
  }

  return (
    <SidebarItem
      title="Discounts"
      iconName="discount"
      link="/dashboard/discount-panel"
      subList={[
        {
          title: "Discount codes",
          path: "/dashboard/discount-panel/discount-codes",
        },
        {
          title: "Product discounts",
          path: "/dashboard/discount-panel/product-discount",
        },
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
