"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";

export default function EmblaCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <IconButton
        onClick={scrollPrev}
        disabled={prevDisabled}
        sx={{
          backgroundColor: prevDisabled ? "grey.300" : "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: prevDisabled ? "grey.300" : "primary.dark",
          },
          borderRadius: 2, // rounded corners
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        disabled={nextDisabled}
        sx={{
          backgroundColor: nextDisabled ? "grey.300" : "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: nextDisabled ? "grey.300" : "primary.dark",
          },
          borderRadius: 2,
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}
