"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Fade, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";

// arrow icons from mui
import { ArrowDownward } from "@mui/icons-material";

const bobbing = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const MoreToSee = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      console.log("showing");
    } else {
      setVisible(false);
      console.log("hiding");
    }
  }, [show]);

  return (
    <Fade in={visible} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            boxShadow: 3,
            borderRadius: 1,
            animation: `${bobbing} 2s infinite`,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <ArrowDownward />
            <Typography variant="h6">Scroll for more!</Typography>
            <ArrowDownward />
          </Stack>
        </Box>
      </Box>
    </Fade>
  );
};

export default MoreToSee;
