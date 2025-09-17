import { CustomImage } from "../../ui/image/customImage";

export function HighlightedItems() {
  return (
    <div className="flex lg:flex-row flex-col items-stretch lg:aspect-[2.9] md:aspect-auto gap-4">
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
      <div className="relative flex flex-col h-full">
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
      </div>
    </div>
  );
}

function BigHighlight() {
  return (
    <div className="flex flex-1 *:w-[50%] p-8 rounded-2xl bg-linear-to-br from-gradient-start-blue via-gradient-middle-blue to-gradient-end-blue">
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-xl">
          Iphone <span className="text-white">15 Series</span>
        </h3>
        <CustomImage
          aspectRatio={1.34}
          className="mt-auto"
          src="/images/highlight/iphone_15.png"
          alt="iphone 15 series"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-4 text-sm">
          <TimeLabel timeNumber={8} label="Days" />
          <TimeLabel timeNumber={16} label="Hours" />
          <TimeLabel timeNumber={12} label="Minutes" />
          <TimeLabel timeNumber={46} label="Seconds" />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">It feels good to be the first</h3>
          <p className="ml-4 text-sm text-slate-600">
            Get ready for the future of smartphones.Experience innovation like
            never before. Stay tuned for the big iPhone 15 pre-sale.
          </p>
        </div>
        <button className="bg-blue-600 text-white py-1.5 px-6 w-fit rounded-md mx-auto mt-4">
          Register Now
        </button>
      </div>
    </div>
  );
}

function TimeLabel(props: { timeNumber: number; label: string }) {
  return (
    <div className="flex flex-col justify-center flex-1 items-center border border-black aspect-square rounded-xl p-0.5">
      <span>{props.timeNumber}</span>
      <span>{props.label}</span>
    </div>
  );
}
