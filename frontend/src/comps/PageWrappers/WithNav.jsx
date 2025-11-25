"use client";

import { Box } from "@mui/material";
import React from "react";

import Navigation from "@/comps/Nav/Nav.jsx";

export default function WithSearch(props) {
  return (
    <>
      <Navigation />
      <Box>{props.children}</Box>
    </>
  );
}
