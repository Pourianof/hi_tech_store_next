import { Wrapper } from "../../_shared/wrapper";

import Icon from "../../../ui/icons/icon";
import { FooterTable } from "./footerTable";
import { FooterPayment } from "./footerPayment";
import { FooterExpandableMenu } from "./footerExpandableMenu";

export function Footer() {
  return (
    <div className="bg-primary-blue-900 text-neutral-400 mt-8">
      <Wrapper>
        <div className="bg-[radial-gradient(100%_100%_at_bottom_center,_rgba(9,81,190,0.3)_0%,_transparent_50%)]">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex-1">
              <div className="hidden md:block ">
                <FooterTable />
              </div>
              <div className="block md:hidden">
                <FooterExpandableMenu />
              </div>
            </div>
            <div className="flex md:flex-col justify-between py-4 desktop::py-8">
              <button className="text-xl bg-primary-blue-50 rounded-full aspect-square text-primary-blue-900">
                <Icon name="message_question" />
              </button>
              <button className="rotate-90 text-xl p-2 bg-primary-blue-50 rounded-full aspect-square text-primary-blue-900">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
          <FooterPayment />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Icon name="copyright" />
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
