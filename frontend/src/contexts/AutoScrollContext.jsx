"use client";

import React, { useContext, useEffect, useRef, useState } from "react"; // Import useContext from react package
import { setCookie, getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";

export const useAutoScroll = () => {
  return useContext(AutoScrollContext);
};

export const AutoScrollContext = React.createContext();

export const AutoScrollProvider = ({ children }) => {
  const [enableAutoScroll, setEnable] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);

  function setEnableAutoScroll(enable) {
    setEnable(enable);
    setCookie("autoscrollEnabled", enable);
  }

  // detect when the user changes the zoom value for the page
  useEffect(() => {
    const handleZoomChange = () => {
      const newZoom = window.devicePixelRatio || 1;
      const zoomThreshold = 0.1; // Define a threshold for zoom change
      if (Math.abs(newZoom - zoom) > zoomThreshold) {
        setZoom(newZoom);
        const previousValue = enableAutoScroll;
        setEnableAutoScroll(true);
        toast.info(
          "We saw you zoomed in! We're going to scroll to better match up the content with your screen.",
        );
        // Temporarily enable auto-scroll to adjust the scroll position

        // Create a timeout to disable auto-scroll after a short delay
        setTimeout(() => {
          setEnableAutoScroll(previousValue);
        }, 3000);
      }
    };

    window.addEventListener("resize", handleZoomChange);

    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
  }, [zoom, enableAutoScroll]);

  useEffect(() => {
    const autoScroll = getCookie("autoscrollEnabled") === "true" ? true : false;
    // if it isn't set, then set it to true
    if (autoScroll === null) {
      setCookie("autoscrollEnabled", true);
      setEnableAutoScroll(true);
    } else {
      setEnableAutoScroll(autoScroll);
    }
  }, []);

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
        if (isUserScrolling || !enableAutoScroll) return; // Ignore adjustments while user is scrolling

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
  }, [isUserScrolling, enableAutoScroll, zoom, window.devicePixelRatio]);

  return (
    <AutoScrollContext.Provider
      value={{ enableAutoScroll, setEnableAutoScroll }}
    >
      {children}
    </AutoScrollContext.Provider>
  );
};
