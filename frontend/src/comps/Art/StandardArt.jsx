"use client";

import React, { useContext } from "react";
import { DarkmodeContext } from "@/contexts/ThemeProvider";
import { Box } from "@mui/material";

const StandardArt = ({ lightModeSVG, darkModeSVG, margin, padding }) => {
  const { isDark } = useContext(DarkmodeContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: margin,
        padding: padding,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={isDark ? darkModeSVG : lightModeSVG}
        alt="Art"
        style={{ width: "80%", height: "80%" }}
      />
    </Box>
  );
};

export default StandardArt;
