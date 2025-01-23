import React, { useState, useEffect } from "react";
import { Button, Box, Paper, Stack } from "@mui/material";

// pause and play button Mui icons
import { PlayArrow, Pause } from "@mui/icons-material";

const PaperStack = ({ papers }) => {
  const [stack, setStack] = useState({});
  const [holder, setHolder] = useState(null); // this is the top element
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);

  // whenever papers changes, update the stack and holder
  useEffect(() => {
    if (Object.keys(papers).length > 1) {
      // set the stack to every entry except the first one
      const keys = Object.keys(papers);
      const firstKey = keys[0];
      const firstValue = papers[firstKey];

      const newStack = { ...papers };
      delete newStack[firstKey];

      setStack(newStack);
      setHolder({ [firstKey]: firstValue });
    }
  }, [papers]);

  // Rotate top paper to the back every 5 seconds
  useEffect(() => {
    if (animating || hovered || paused) return;

    const interval = setInterval(() => {
      rotateTopPaperToBack();
    }, 3000);

    return () => clearInterval(interval);
  }, [animating, hovered, paused, stack]);

  const rotateTopPaperToBack = () => {
    if (Object.keys(stack).length > 0) {
      setAnimating(true); // Lock animation

      // after the animation is done, move the top paper to the back and set the new top paper
      setTimeout(() => {
        const newStack = { ...stack };
        const newHolder = { ...holder };

        const keys = Object.keys(holder);
        const key = keys[0];
        const value = holder[key];

        delete newHolder[key];
        newStack[key] = value;

        const nextKey = Object.keys(newStack)[0];
        const nextValue = newStack[nextKey];
        delete newStack[nextKey];
        newHolder[nextKey] = nextValue;

        setStack(newStack);
        setHolder(newHolder);
        setAnimating(false); // Unlock animation
      }, 500); // Adjust the timeout duration as needed
    }
  };

  const handleAnimationEnd = () => {
    setAnimating(false); // Allow next animation
  };

  const handleHover = (isHovered) => {
    setHovered(isHovered);
  };

  const handleClick = () => {
    if (animating) return;

    console.log(`Clicked on paper stack`);
    rotateTopPaperToBack(0); // Rotate the top paper on click
  };

  return (
    <Stack
      id="paper_stack"
      sx={{
        position: "relative",
        height: "70vh",
        width: "100vw",
        ml: 5,
      }}
    >
      <Box
        sx={{
          height: "100%",
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleClick}
      >
        {[
          ...(holder ? Object.entries(holder) : []),
          ...Object.entries(stack),
        ].map(([key, paper], index) => (
          <SinglePaperFlyaway
            key_value={key}
            key={key}
            paper={paper}
            onAnimationEnd={handleAnimationEnd}
            index={index}
            sx={hovered || paused ? { transform: `scale(${1.05})` } : {}}
            isAnimating={index === 0 && animating}
          />
        ))}
      </Box>

      {/* Pause and Play */}
      <Stack direction="row" spacing={2}>
        {paused ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={() => setPaused(false)}
          >
            Play
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Pause />}
            onClick={() => setPaused(true)}
          >
            Pause
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

const SinglePaperFlyaway = ({
  paper,
  onAnimationEnd,
  index,
  sx,
  isAnimating,
}) => {
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setFlyAway(true);
    } else {
      setFlyAway(false);
    }
  }, [isAnimating]);

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
        opacity: index === 0 ? (flyAway ? 0 : 1) : 0.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -index,
        cursor: "pointer",
        width: "70vw",
        ...sx,
      }}
      onTransitionEnd={handleAnimationEnd}
    >
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "60vh",
          border: isAnimating ? "1px solid green" : null,
        }}
        variant="outlined"
      >
        {paper}
      </Paper>
    </Box>
  );
};

export default PaperStack;
