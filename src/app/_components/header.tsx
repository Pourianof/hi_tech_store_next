import Icon from "@/ui/icons/icon";
import Image from "next/image";
import Link from "next/link";
import { Wrapper } from "../_shared/wrapper";
import { APP_TITLE } from "../consts";
import { CartBadge } from "./cartBadge";
import { HeaderDrawerButton } from "./headerDrawerButton";
import { UserLink } from "./userLink";

export async function Header() {
  return (
    <header className="border-b py-2 sticky top-0 bg-white z-50">
      <Wrapper>
        <LargeHeader />
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
        <UserLink />
      </div>
    </div>
  );
}

function LargeHeader() {
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
        <UserLink />
      </div>
    </div>
  );
}
