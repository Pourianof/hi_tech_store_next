import { Wrapper } from "../_shared/wrapper";
import Facebook from "../../../public/icons/socials/Facebook.svg";
import Instagram from "../../../public/icons/socials/Instagram.svg";
import Twitter from "../../../public/icons/socials/twitter.svg";
import Youtube from "../../../public/icons/socials/Youtube.svg";

import Image from "next/image";
import Icon from "../../ui/icons/icon";

export function Footer() {
  return (
    <div className="bg-primary-blue-900 text-neutral-400 mt-8">
      <Wrapper>
        <div className="bg-[radial-gradient(100%_100%_at_bottom_center,_rgba(9,81,190,0.3)_0%,_transparent_50%)]">
          <div className="flex">
            <div className="flex-1">
              <FooterTable />
            </div>
            <div className="flex flex-col justify-between py-8">
              <button className="text-xl bg-primary-blue-50 rounded-full aspect-square text-primary-blue-900">
                <Icon>m</Icon>
              </button>
              <button className="-rotate-90 text-4xl text-primary-blue-50">
                <Icon>r</Icon>
              </button>
            </div>
          </div>
          <FooterPayment />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Icon>c</Icon>
            <p className="text-[10px]">2025 Tech Store</p>
          </div>
          <div className="text-[10px] flex gap-6 p-5">
            <span>cookies setting</span>
            <span>Privacy Policy</span>
            <span>Terms and Conditions </span>
            <span>Imprint </span>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

function FooterPayment() {
  return (
    <div className="h-[25px] flex gap-1">
      <Image
        width={32}
        height={24}
        src="/images/payment/paypal.png"
        alt="Visa"
      />
      <Image
        width={32}
        height={24}
        src="/images/payment/american_express.png"
        alt="Visa"
      />
      <Image width={32} height={24} src="/images/payment/visa.png" alt="Visa" />
      <Image
        width={32}
        height={24}
        src="/images/payment/master_card.png"
        alt="Visa"
      />
    </div>
  );
}

function FooterTable() {
  return (
    <table className="w-full table-auto border-separate border-spacing-2 border-spacing-x-5">
      <thead>
        <tr className="text-left text-neutral-200">
          <th>Company</th>
          <th>Info</th>
          <th>Contact us</th>
          <th>Sign up for News and updates</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr>
          <td>about us</td>
          <td>How it works</td>
          <td>
            <address>123 Main Street, Anytown,USA</address>
          </td>
          <td rowSpan={2}>
            <div className="has-focus:border-blue-500  border flex gap-1 p-2 rounded-md max-w-[180px]">
              <label htmlFor="subscription-email">
                <Icon>u</Icon>
              </label>
              <input
                className="w-32 outline-0"
                id="subscription-email"
                type="email"
                placeholder="E-mail Address"
              />
              <button>
                <Icon>R</Icon>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>about blog</td>
          <td>our promises</td>
          <td>+1 (555) 123-4567</td>
        </tr>
        <tr>
          <td>about returns</td>
          <td>FAQ</td>
          <td>TechHeimSupport@gmail.com</td>
          <td>
            <div className="flex gap-4">
              <Image
                src={Facebook}
                alt="Facebook account"
                width={32}
                height={32}
              />
              <Image
                src={Instagram}
                alt="Instagram account"
                width={32}
                height={32}
              />
              <Image
                src={Twitter}
                alt="Twitter account"
                width={32}
                height={32}
              />
              <Image
                src={Youtube}
                alt="Youtube account"
                width={32}
                height={32}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>about other status</td>
        </tr>
      </tbody>
    </table>
  );
}
