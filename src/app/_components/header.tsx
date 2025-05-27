import Image from "next/image";
import { APP_TITLE } from "../consts";
import Link from "next/link";
import Icon from "./icon";
import { Wrapper } from "../_shared/wrapper";

export function Header() {
  return (
    <header className="border-b py-2">
      <Wrapper className="wrapper items-center flex">
        <Image alt={APP_TITLE} src={"/icons/logo.svg"} width={50} height={50} />
        <div className="mx-auto space-x-14">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Products</Link>
          <Link href={"/"}>Blog</Link>
          <Link href={"/"}>FAQ</Link>
          <Link href={"/"}>Contact Us</Link>
        </div>
        <div className="space-x-4">
          <Icon>s</Icon>
          <Icon>e</Icon>
          <Icon>u</Icon>
        </div>
      </Wrapper>
    </header>
  );
}
