"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InViewFadeIn from "@/comps/TransitionHelpers/InViewFadeIn";

export const useAdjustScroll = () => {
  const observerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const scrollDuration = 500; // Adjust duration for smooth scroll

  useEffect(() => {
    // Detect user-initiated scrolling
    const handleUserScroll = () => {
      setIsUserScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsUserScrolling(false), 1000); // Re-enable auto-scroll after inactivity
    };

    window.addEventListener("scroll", handleUserScroll, { passive: true });

    const smoothScrollTo = (targetPosition) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const scrollStep = (timestamp) => {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / scrollDuration, 1);
        window.scrollTo(0, startPosition + distance * progress);
        if (elapsedTime < scrollDuration) {
          requestAnimationFrame(scrollStep);
        }
      };
      requestAnimationFrame(scrollStep);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isUserScrolling) return; // Ignore adjustments while user is scrolling

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the entry that is most visible and adjust the scroll position smoothly
            const element = entry.target;
            const elementTop =
              element.getBoundingClientRect().top + window.scrollY;
            smoothScrollTo(elementTop);
          }
        });
      },
      { threshold: 0.5 },
    );

    const elements = document.querySelectorAll(".adjustable-content");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current.unobserve(el));
      window.removeEventListener("scroll", handleUserScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isUserScrolling]);

  return null; // No UI elements needed
};

const WholeScreen = ({ children }) => {
  return (
    <div className="adjustable-content" id="whole-screen">
      <InViewFadeIn>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </InViewFadeIn>
    </div>
  );
};

export default WholeScreen;
