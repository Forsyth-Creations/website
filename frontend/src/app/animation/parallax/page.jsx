"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Box, Typography, Chip, Fade } from "@mui/material";
import Check from "@mui/icons-material/Check";

// Hook to track which section is currently in view
function useSectionObserver(sectionRefs) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const lastIndexRef = React.useRef(-1);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      const distances = sectionRefs.current.map((ref, index) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();

        // Special logic for the first section: only consider it when fully in view
        if (index === 0) {
          console.log(`Checking section 0 visibility:`, rect);
          const fullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
          if (!fullyVisible) return Infinity;
        } else {
          // Ignore sections that are completely out of view
          if (rect.bottom < 0 || rect.top > viewportHeight) return Infinity;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        return Math.abs(sectionCenter - viewportCenter);
      });

      const minDistance = Math.min(...distances);
      const newIndex = distances.findIndex((d) => d === minDistance);

      if (minDistance === Infinity || minDistance > viewportHeight - 10) {
        lastIndexRef.current = -1;
        setActiveIndex(-1);
        return;
      }

      if (
        newIndex !== lastIndexRef.current &&
        (lastIndexRef.current === -1 ||
          Math.abs(distances[newIndex] - distances[lastIndexRef.current]) > 100)
      ) {
        lastIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return activeIndex;
}

function ScrollRevealItem({ title, content, active, isLast }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={active ? "primary" : "grey"}
          sx={{
            width: 28,
            height: 28,
            backgroundColor: active ? "green" : "transparent",
            borderColor: active ? "green" : "grey.500",
            borderWidth: 2,
            borderStyle: "solid",
          }}
        >
          {active && <Check sx={{ fontSize: 18 }} />}
        </TimelineDot>
        {!isLast && <TimelineConnector sx={{ height: 80 }} />}
      </TimelineSeparator>
      <TimelineContent>
        <Box
          sx={{
            py: 3,
            transition: "all 0.4s ease-out",
          }}
        >
          <Typography
            variant="h1"
            fontWeight={active ? "bold" : "normal"}
            sx={{
              fontSize: active ? "4rem" : "1rem",
              transition: "font-size 0.4s ease, color 0.3s ease",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: active ? "0.5rem" : "0.5rem",
              transition: "font-size 0.4s ease, color 0.3s ease",
            }}
          >
            {content}
          </Typography>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
}

function ScrollTimeline({ events, activeIndex }) {
  return (
    <Fade
      in={activeIndex !== -1}
      timeout={{ enter: 500, exit: 0 }} // exit immediately
    >
      <Box
        id="test"
        sx={{
          px: 5,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        <Timeline
          position="right"
          sx={{
            mt: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            px: 2,
            zIndex: 10,
          }}
        >
          {events.map((event, i) => (
            <ScrollRevealItem
              key={i}
              title={event.title}
              content={event.content}
              active={i <= activeIndex}
              isLast={i === events.length - 1}
            />
          ))}
        </Timeline>
      </Box>
    </Fade>
  );
}

export default function Page() {
  const events = [
    {
      title: "Start",
      content: "This is where it all begins.",
      body: "This is the beginning of our journey.",
    },
    {
      title: "Milestone 1",
      content: "First major accomplishment.",
      body: "We achieved our first major goal.",
    },
    {
      title: "Milestone 2",
      content: "Second major accomplishment.",
      body: "We reached another significant milestone.",
    },
  ];

  const images = ["/images/1.png", "/images/2.png", "/images/3.png"];

  const sectionRefs = useRef(images.map(() => React.createRef()));
  const activeIndex = useSectionObserver(sectionRefs);

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(/images/0.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      ></Box>

      <ScrollTimeline events={events} activeIndex={activeIndex} />
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* A smaller box to use as the ref  */}
          <Box
            ref={(el) => (sectionRefs.current[index] = el)}
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "30%",
              backgroundColor: "transparent",
            }}
          ></Box>
        </Box>
      ))}

      <Box
        sx={{
          backgroundImage: `url(/images/0.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      ></Box>

      {/* Show the body of the current index, on the right of the screen */}
      {/* <Box
            sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '50%',
            height: '100vh',
            color: 'white',
            p: 4,
            overflowY: 'auto',
            zIndex: 100,
            }}
        >
            {activeIndex !== -1 && (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {events[activeIndex].title}
                    </Typography>
                    <Typography variant="body1">
                        {events[activeIndex].body}
                    </Typography>
                </Box>
            )}
        </Box> */}

      {/* Chip to show the current index */}
      {/* <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Chip
          label={`Current Section: ${activeIndex + 1}`}
          color="primary"
          variant="outlined"
          sx={{ fontSize: "1rem", fontWeight: "bold" }}
        />
      </Box> */}
    </Box>
  );
}
