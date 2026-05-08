"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight, ArrowOutward } from "@mui/icons-material";
import Link from "next/link";

// slides: [{ image, link, title, description }]
export default function EmblaCarousel({ slides = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 4500);
  }, [emblaApi, stopAutoplay]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    startAutoplay();
  }, [emblaApi, startAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    startAutoplay();
  }, [emblaApi, startAutoplay]);

  const scrollTo = useCallback(
    (i) => {
      emblaApi?.scrollTo(i);
      startAutoplay();
    },
    [emblaApi, startAutoplay],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    startAutoplay();
    return () => stopAutoplay();
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <Box
      sx={{ position: "relative", width: "100%", maxWidth: "82vw", mx: "auto" }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Embla viewport */}
      <Box
        ref={emblaRef}
        sx={{ overflow: "hidden", borderRadius: "6px" }}
      >
        <Box sx={{ display: "flex", touchAction: "pan-y pinch-zoom" }}>
          {slides.map((slide, i) => (
            <Box
              key={i}
              sx={{ flex: "0 0 100%", minWidth: 0, position: "relative" }}
            >
              <Box
                component={slide.link ? Link : "div"}
                href={slide.link || undefined}
                sx={{ display: "block", textDecoration: "none" }}
              >
                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.title || `Slide ${i + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: "40vh", md: "52vh" },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Bottom overlay with title */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(8,15,24,0.88) 0%, transparent 100%)",
                    px: 3,
                    py: 2.5,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        mb: 0.4,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(slides.length).padStart(2, "0")}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontWeight: 700,
                        fontSize: { xs: "1.3rem", md: "1.6rem" },
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                      }}
                    >
                      {slide.title}
                    </Typography>
                    {slide.description && (
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.65)",
                          fontSize: "0.8rem",
                          mt: 0.4,
                        }}
                      >
                        {slide.description}
                      </Typography>
                    )}
                  </Box>
                  {slide.link && (
                    <ArrowOutward
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "1.1rem",
                        mb: 0.25,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Prev arrow — overlaid on left */}
      <IconButton
        onClick={scrollPrev}
        sx={{
          position: "absolute",
          left: 12,
          top: "45%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(8,15,24,0.65)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          borderRadius: 1,
          width: 40,
          height: 40,
          "&:hover": { bgcolor: "primary.main", borderColor: "primary.main" },
          transition: "all 0.2s",
          zIndex: 2,
        }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>

      {/* Next arrow — overlaid on right */}
      <IconButton
        onClick={scrollNext}
        sx={{
          position: "absolute",
          right: 12,
          top: "45%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(8,15,24,0.65)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          borderRadius: 1,
          width: 40,
          height: 40,
          "&:hover": { bgcolor: "primary.main", borderColor: "primary.main" },
          transition: "all 0.2s",
          zIndex: 2,
        }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>

      {/* Dot indicators */}
      <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 2 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => scrollTo(i)}
            sx={{
              width: i === selectedIndex ? 28 : 7,
              height: 3,
              borderRadius: 2,
              bgcolor: i === selectedIndex ? "primary.main" : "divider",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
