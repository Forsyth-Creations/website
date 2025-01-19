"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import InViewFadeIn from "@/comps/TransitionHelpers/InViewFadeIn";

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
