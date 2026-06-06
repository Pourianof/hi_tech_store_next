import { Row } from "@/ui/layouts/row";
import Image from "next/image";
import Facebook from "../../../../public/icons/socials/Facebook.svg";
import Instagram from "../../../../public/icons/socials/Instagram.svg";
import Twitter from "../../../../public/icons/socials/twitter.svg";
import Youtube from "../../../../public/icons/socials/Youtube.svg";

export function PaymentLogos() {
  return (
    <Row className="gap-4">
      <Image src={Facebook} alt="Facebook account" width={32} height={32} />
      <Image src={Instagram} alt="Instagram account" width={32} height={32} />
      <Image src={Twitter} alt="Twitter account" width={32} height={32} />
      <Image src={Youtube} alt="Youtube account" width={32} height={32} />
    </Row>
  );
}
