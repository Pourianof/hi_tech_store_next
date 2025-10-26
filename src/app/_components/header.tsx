import Icon from "@/ui/icons/icon";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../../auth";
import { Wrapper } from "../_shared/wrapper";
import { APP_TITLE } from "../consts";
import { CartBadge } from "./cartBadge";
import { HeaderDrawerButton } from "./headerDrawerButton";

export async function Header() {
  const session = await auth();
  return (
    <header className="border-b py-2 sticky top-0 bg-white z-50">
      <Wrapper>
        <LargeHeader session={session} />
        <MobileHeader />
      </Wrapper>
    </header>
  );
}

function MobileHeader() {
  return (
    <div className="md:hidden flex justify-between gap-2 text-xl font-medium">
      <HeaderDrawerButton />
      <Link href={{ pathname: "/" }}>
        <h4 className="font-semibold text-primary-blue-400">HiTech Store</h4>
      </Link>
      <div className="flex gap-4 items-center">
        <CartBadge />
        <Icon name="user" />
      </div>
    </div>
  );
}

function LargeHeader({ session }: { session: Session | null }) {
  return (
    <div className="items-center hidden md:flex ">
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
        <CartBadge />
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
    </div>
  );
}
