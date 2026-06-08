import { H4 } from "@/ui/theme/text/headers";
import { CustomImage } from "../../ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";

export function HighlightedItems() {
  return (
    <div className="flex lg:flex-row flex-col items-stretch lg:aspect-[2.9] sm:*:bg-amber-50 md:aspect-auto gap-4">
      <BigHighlight />
      <SquareBoxHighlight />
    </div>
  );
}

function SquareBoxHighlight() {
  return (
    <div className="relative overflow-hidden rounded-2xl lg:h-full bg-highlight-box-blue lg:aspect-square md:aspect-auto md:h-[200px]">
      <div className="absolute bottom-0 rounded-[50%] left-[50%] translate-y-1/2 -translate-x-1/2 w-[140%] h-full bg-highlight-yellow "></div>
      <div className="absolute bg-highlight-yellow h-[60%] left-0 top-0 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"></div>
      <Column className="relative h-full">
        <h4 className="lg:static absolute left-16 text-xl my-8 text-center text-highlight-yellow">
          Play Station 5
        </h4>
        <div className="grid grid-cols-[60%_40%] gap-4 mt-auto lg:h-1/2 md:h-full ">
          <div className="flex flex-col items-center justify-end mb-4 gap-2">
            <span className="text-highlight-box-blue lg:mb-16">
              Digital Edition + 2TB
            </span>
            <button className="bg-main-blue text-white text-sm py-2 px-8 rounded-md ">
              Buy Now
            </button>
          </div>
          <CustomImage
            className="place-content-start md:w-auto md:h-[200px]"
            src="/images/highlight/ps5.png"
            alt="ps5"
            square
          />
        </div>
      </Column>
    </div>
  );
}

function BigHighlight() {
  return (
    <Row className="relative overflow-clip flex-1 min-[530px]:max-[768px]:gap-[10%] *:w-[50%] p-2 md:p-8 rounded-lg md:rounded-2xl bg-linear-to-br from-gradient-start-blue via-gradient-middle-blue to-gradient-end-blue">
      <Column className="relative flex-1">
        <H4 className="font-semibold">
          Iphone <span className="text-white">15 Series</span>
        </H4>
        <CustomImage
          aspectRatio={1.34}
          className="mt-auto w-full -bottom-8 left-0 absolute md:scale-100 md:static"
          src="/images/highlight/iphone_15.png"
          alt="iphone 15 series"
        />
      </Column>
      <Column>
        <Row className="gap-1 md:gap-4 text-sm">
          <TimeLabel timeNumber={8} label="Days" />
          <TimeLabel timeNumber={16} label="Hours" />
          <TimeLabel timeNumber={12} label="Minutes" />
          <TimeLabel timeNumber={46} label="Seconds" />
        </Row>
        <div className="mt-4">
          <h3 className="font-semibold text-[12px] ">
            It feels good to be the first
          </h3>
          <p className="ml-4 text-[8px] md:text-sm text-slate-600">
            Get ready for the future of smartphones.Experience innovation like
            never before. Stay tuned for the big iPhone 15 pre-sale.
          </p>
        </div>
        <button className="bg-blue-600 text-button-sm md:text-button-lg text-white py-1.5 px-6 w-fit rounded-md mx-auto mt-4">
          Register Now
        </button>
      </Column>
    </Row>
  );
}

function TimeLabel(props: { timeNumber: number; label: string }) {
  return (
    <div className="text-[8px] md:text-[12px] flex flex-col justify-center flex-1 items-center border border-black aspect-square rounded-lg md:rounded-xl p-0.5">
      <span>{props.timeNumber}</span>
      <span>{props.label}</span>
    </div>
  );
}
