import Icon from "@/ui/icons/icon";
import Link from "next/link";
import { auth } from "../../../../auth";

export default async function DashboardSidebar() {
  const session = await auth();

  return (
    <div>
      <h3 className="my-1">
        <Icon className="text-4xl me-1" name="profile" />
        Hello{" "}
        <span className="bg-gray-300 inline-block rounded py-0.5 px-1">
          {session?.user.name} {session?.user.lastName}
        </span>
      </h3>
      <ul className="bg-gray-300 p-4 [&_li]:my-1.5 rounded">
        <li className="font-semibold">
          <Link href="/dashboard">Overview</Link>
        </li>
        <li>
          <Icon className="me-1" name="product" />
          <span className="text-gray-800 cursor-default font-semibold">
            Products
          </span>
          <div className="ps-2">
            <ul className="px-2 space-y-1 border-l border-l-black/50 text-blue-950">
              <li>
                <Link href="/dashboard/add-product">Add new product</Link>
              </li>
              <li>
                <Link href="/dashboard/my-products">My products</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="font-semibold">
          <Icon className="me-1" name="category" />
          <Link href="/dashboard/categories">Categories</Link>
        </li>
      </ul>
    </div>
  );
}
