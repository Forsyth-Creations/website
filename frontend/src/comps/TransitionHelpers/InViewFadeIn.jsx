"use client";

import React from "react";
import { Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";

const InViewFadeIn = ({ children }) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={inViewRef}>
      <Fade in={inView} timeout={1000}>
        <div>{children}</div>
      </Fade>
    </div>
  );
};

export default InViewFadeIn;
