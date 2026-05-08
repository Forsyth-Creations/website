"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Fade } from "@mui/material";
import { keyframes } from "@emotion/react";

const drift = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const MoreToSee = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <Fade in={visible} timeout={600}>
      <Box
        sx={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.75,
          animation: `${drift} 2.4s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </Typography>
        <Box
          sx={{
            width: 1.5,
            height: 32,
            bgcolor: "primary.main",
            borderRadius: 1,
            opacity: 0.6,
          }}
        />
      </Box>
    </Fade>
  );
};

export default MoreToSee;
