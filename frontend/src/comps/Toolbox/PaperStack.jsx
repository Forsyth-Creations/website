import React, { useState, useEffect } from "react";
import { Button, Box, Paper } from "@mui/material";

const PaperStack = ({ papers }) => {
  const [stack, setStack] = useState(papers);
  const [animating, setAnimating] = useState(false); // Tracks animation status
  const [hovered, setHovered] = useState(false); // Tracks hover state for the entire stack

  // Rotate top paper to the back every 5 seconds
  useEffect(() => {
    if (animating || hovered) return; // Skip if animation is ongoing or stack is hovered
    const interval = setInterval(() => {
      if (Object.keys(stack).length > 0) {
        setAnimating(true); // Lock during animation
        const keys = Object.keys(stack);
        const topKey = keys[0];
        const topValue = stack[topKey];

        const newStack = { ...stack };
        delete newStack[topKey];
        setStack({ ...newStack, [topKey]: topValue }); // Move top paper to the back
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [stack, animating, hovered]);

  const resetStack = () => {
    setStack(papers);
    setAnimating(false);
  };

  const handleAnimationEnd = () => {
    setAnimating(false); // Allow next animation
  };

  const handleHover = (isHovered) => {
    setHovered(isHovered);
  };

  const handleClick = () => {
    if (animating) return; // Skip if animation is ongoing
    console.log(`Clicked on paper stack`);

    // Rotate top paper to the back
    if (Object.keys(stack).length > 0) {
      setAnimating(true); // Lock during animation
      const keys = Object.keys(stack);
      const topKey = keys[0];
      const topValue = stack[topKey];

      const newStack = { ...stack };
      delete newStack[topKey];
      setStack({ ...newStack, [topKey]: topValue }); // Move top paper to the back
    }
  };

  return (
    <Box
      id="paper_stack"
      sx={{
        position: "relative",
        height: "70vh",
        width: "100vw",
      }}
    >
      {Object.keys(stack).length === 0 && (
        <Button
          variant="outlined"
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={resetStack}
        >
          Reset Stack
        </Button>
      )}
      <Box
        sx={{
          height: "100%",
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleClick}
      >
        {Object.entries(stack).map(([key, paper], index) => (
          <SinglePaperFlyaway
            key_value={key}
            key={key}
            paper={paper}
            onAnimationEnd={handleAnimationEnd}
            index={index}
            sx={hovered ? { transform: `scale(${1.05})` } : {}}
          />
        ))}
      </Box>
    </Box>
  );
};

const SinglePaperFlyaway = ({ paper, onAnimationEnd, index, sx }) => {
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setFlyAway(true);
    } else {
      setFlyAway(false);
    }
  }, [index]);

  const handleAnimationEnd = () => {
    if (flyAway) {
      onAnimationEnd();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${index * 10}px`,
        left: `${10 - index * 10}px`,
        transition: "transform 1s ease, opacity 0.5s ease",
        transform: flyAway ? "translateX(200%)" : "translateX(0)",
        opacity: flyAway ? 0 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -index,
        cursor: "pointer",
        width: "70vw",
        // pl : 4,
        ...sx,
      }}
      onTransitionEnd={handleAnimationEnd}
    >
      <Paper sx={{ width: "100%", height: "100%" }}>{paper}</Paper>
    </Box>
  );
};

export default PaperStack;
