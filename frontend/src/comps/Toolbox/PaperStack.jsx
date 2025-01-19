import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  useMediaQuery,
  Popper,
  IconButton,
  Paper,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const PaperStack = ({ papers }) => {
  const [stack, setStack] = useState(papers);
  const [dismissedPapers, setDismissedPapers] = useState({});
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const retrievePaperFromDismissed = (key) => {
    setStack((prev) => {
      return { [key]: dismissedPapers[key], ...prev };
    });

    setDismissedPapers((prev) => {
      const newDismissed = { ...prev };
      delete newDismissed[key];
      return newDismissed;
    });
  };

  const resetStack = () => {
    setStack(papers);
    setDismissedPapers({});
    setAnimatingIndex(null);
  };

  const handleAnimationEnd = (key_value) => {
    setAnimatingIndex(null);
    // the dismissedPapers is a dict
    setDismissedPapers((prev) => {
      return { ...prev, [key_value]: stack[key_value] };
    });

    // remove the paper from the stack
    setStack((prev) => {
      const newStack = { ...prev };
      delete newStack[key_value];
      return newStack;
    });
  };

  return (
    <Box
      id="paper_stack"
      sx={{
        position: "relative",
        height: "70vh",
        width: "100vw",
        p: 2,
      }}
    >
      {Object.keys(stack).length <= 0 && (
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
      {/* Active stack */}
      {Object.entries(stack).map(([key, paper], index) => (
        <SinglePaperFlyaway
          key_value={key}
          key={key}
          paper={paper}
          dismissed={dismissedPapers[key]}
          onAnimationEnd={handleAnimationEnd}
          index={index}
          setAnimatingIndex={setAnimatingIndex}
        />
      ))}

      {/* Show dots on the side of the screen with the names of the dismissed files */}

      {/* If it is small, show an icon that the user can click that uses a popper to recover the dismissed papers */}
      {
        <IconButton
          sx={{
            position: "absolute",
            bottom: "2%",
            right: "2%",
            backgroundColor: "primary.main",
          }}
          onClick={(event) => setAnchor(anchor ? null : event.currentTarget)}
        >
          <ReceiptLongIcon sx={{ color: "white" }} />
        </IconButton>
      }

      <Popper
        open={Boolean(anchor)}
        anchorEl={anchor}
        placement="top"
        sx={{
          zIndex: 100,
        }}
      >
        <Paper
          sx={{
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {Object.entries(dismissedPapers).map(([key, paper]) => (
            <Box
              key={key}
              sx={{
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
              onClick={() => retrievePaperFromDismissed(key)}
            >
              {key}
            </Box>
          ))}
        </Paper>
      </Popper>
    </Box>
  );
};

const SinglePaperFlyaway = ({
  paper,
  dismissed,
  onAnimationEnd,
  key_value,
  setAnimatingIndex,
  index,
}) => {
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    if (dismissed) {
      setFlyAway(true);
      setAnimatingIndex(key_value);
    }
  }, [dismissed, key_value, setAnimatingIndex]);

  const handleAnimationEnd = () => {
    if (flyAway) {
      onAnimationEnd(key_value);
    }
  };

  const handleClick = () => {
    if (!flyAway) {
      setFlyAway(true);
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
        width: "90vw",
      }}
      onTransitionEnd={handleAnimationEnd}
      onClick={handleClick}
    >
      {paper}
    </Box>
  );
};

export default PaperStack;
