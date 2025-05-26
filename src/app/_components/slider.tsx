import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ISliderContext = {
  containerRef: EmblaViewportRefType;
  emblaApi?: ReturnType<typeof useEmblaCarousel>[1];
};

const SliderContext = createContext<ISliderContext>({} as ISliderContext);

function Slider(props: { children: ReactNode }) {
  const [sliderRef, emblaApi] = useEmblaCarousel();
  return (
    <section className="flex-1 overflow-hidden">
      <SliderContext.Provider value={{ emblaApi, containerRef: sliderRef }}>
        {props.children}
      </SliderContext.Provider>
    </section>
  );
}

function SliderItem(props: { children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0  ${props.className ?? ""}`}>{props.children}</div>
  );
}

function SliderContainer(props: { className?: string; children: ReactNode }) {
  const sliderCTX = useContext(SliderContext);
  return (
    <div className="overflow-hidden" ref={sliderCTX.containerRef}>
      <div className={`flex ${props.className ?? ""}`}>{props.children}</div>
    </div>
  );
}

function sliderButtonProvider({ isForward }: { isForward: boolean }) {
  return function SliderButton(props: {
    children: ReactNode;
    className?: string;
    inActiveClassName?: string;
  }) {
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { emblaApi } = useContext(SliderContext);

    const onButtonClick = useCallback(() => {
      if (!emblaApi) return;
      if (!isForward) emblaApi.scrollPrev();
      else if (isForward) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setBtnDisabled(
        (isForward && !emblaApi.canScrollNext()) ||
          (!isForward && !emblaApi.canScrollPrev())
      );
    }, []);

    useEffect(() => {
      if (!emblaApi) return;

      onSelect(emblaApi);
      emblaApi.on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
      <div
        className={`${props.className} ${
          btnDisabled ? "text-gray-400 " + (props.inActiveClassName ?? "") : ""
        }`}
        onClick={onButtonClick}
      >
        {props.children}
      </div>
    );
  };
}

const SliderForwardButton = sliderButtonProvider({ isForward: true });
const SliderBackwardButton = sliderButtonProvider({ isForward: false });

Slider.SliderItem = SliderItem;
Slider.SliderContainer = SliderContainer;
Slider.SliderBackwardButton = SliderBackwardButton;
Slider.SliderForwardButton = SliderForwardButton;

export { Slider };
