import Image from "next/image";
import { APP_TITLE } from "../consts";
import Link from "next/link";
import { Wrapper } from "../_shared/wrapper";
import { auth } from "../../../auth";
import Icon from "@/ui/icons/icon";

export async function Header() {
  const session = await auth();
  return (
    <header className="border-b py-2">
      <Wrapper className="wrapper items-center flex">
        <Image alt={APP_TITLE} src={"/icons/logo.svg"} width={50} height={50} />
        <div className="mx-auto space-x-14">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/"}>Blog</Link>
          <Link href={"/"}>FAQ</Link>
          <Link href={"/"}>Contact Us</Link>
        </div>
        <div className="space-x-2 flex">
          <Icon name="search" />
          <Icon name="order_basket" />
          <Link
            className="flex gap-1"
            href={{ pathname: session ? "/account" : "/login" }}
          >
            <Icon name="user" />
            {!!session && (
              <span className="text-sm bg-gray-300 inline-block px-1 rounded hover:bg-gray-400">
                {session.user?.name}
              </span>
            )}
          </Link>
        </div>
      </Wrapper>
    </header>
  );
}
