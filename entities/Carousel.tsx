"use client";

import { Images } from "@/shared/types/product";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  slides: Images[];
  alt: string;
}

const Carousel = ({ slides, alt }: CarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(
    () => emblaMainApi?.scrollPrev(),
    [emblaMainApi],
  );
  const scrollNext = useCallback(
    () => emblaMainApi?.scrollNext(),
    [emblaMainApi],
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi.scrollTo(index);

    setPrevBtnDisabled(!emblaMainApi.canScrollPrev());
    setNextBtnDisabled(!emblaMainApi.canScrollNext());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* MAIN SLIDER */}
      <div className="overflow-hidden relative" ref={emblaMainRef}>
        <div className="flex -ml-4">
          {slides.map((slide) => (
            <div key={slide.url} className="flex-[0_0_100%] pl-4">
              <div className="h-120 relative flex items-center justify-center rounded-2xl text-4xl font-semibold ">
                <Image
                  src={slide.url}
                  alt={`${alt}`}
                  className="absolute inset-0 object-contain w-full h-full"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between mt-4 mb-2 px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="cursor-pointer p-2 rounded-full border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="cursor-pointer p-2 rounded-full border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* THUMBS */}
      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex -ml-3">
            {slides.map((slide, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div key={slide.url} className="flex-[0_0_18%] pl-3">
                  <button
                    onClick={() => onThumbClick(index)}
                    className={`
                      cursor-pointer relative w-full h-30 rounded-xl flex items-center justify-center text-lg font-semibold transition hover:opacity-60
                      ${isSelected ? "opacity-100 hover:opacity-100" : "opacity-40"}
                    `}
                  >
                    <Image
                      src={slide.url}
                      alt={`${alt}`}
                      className="absolute inset-0 object-contain w-full h-full"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="eager"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
