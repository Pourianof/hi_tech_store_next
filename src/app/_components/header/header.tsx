import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import Image from "next/image";
import Link from "next/link";
import { Wrapper } from "../../_shared/wrapper";
import { APP_TITLE } from "../../consts";
import { HeaderDrawerButton } from "../headerDrawerButton";
import { CartBadge } from "./cartBadge";
import {
  HeaderModalHoverZone,
  HeaderModalRenderContainer,
} from "./headerModal";
import { ProductsMenu } from "./productsMenu";
import { SearchButton } from "./searchBox";
import { UserLink } from "./userLink";

export async function Header() {
  return (
    <header className="sticky top-0 bg-white z-50 border-b">
      <Wrapper className="relative py-2">
        <HeaderModalRenderContainer>
          <LargeHeader />
          <MobileHeader />
        </HeaderModalRenderContainer>
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
    <div className="items-center hidden md:flex">
      <Image alt={APP_TITLE} src={"/icons/logo.svg"} width={50} height={50} />
      <div className="mx-auto space-x-14">
        <Link href={"/"} className="hover:text-primary-blue-0c">
          <Body size="lg">Home</Body>
        </Link>
        <Link href={"/products"}>
          <HeaderModalHoverZone
            name="products"
            modalContent={<ProductsMenu />}
            zoneClassName="w-full"
          >
            <Body
              size="lg"
              className="relative hover:text-primary-blue-0c px-2 py-1 hover:after:block after:hidden after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-linear-to-r after:from-transparent after:via-primary-blue-0c after:to-transparent"
            >
              Products
            </Body>
          </HeaderModalHoverZone>
        </Link>
        <Link href={"/"} className="hover:text-primary-blue-0c">
          <Body size="lg">Blog</Body>
        </Link>
        <Link href={"/"} className="hover:text-primary-blue-0c">
          <Body size="lg">FAQ</Body>
        </Link>
        <Link href={"/"} className="hover:text-primary-blue-0c">
          <Body size="lg">Contact Us</Body>
        </Link>
      </div>
      <Row className="gap-x-2" centerV>
        <SearchButton />
        <CartBadge />
        <UserLink />
      </Row>
    </div>
  );
}
