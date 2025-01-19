"use client";

import {
  Box,
  Container,
  LinearProgress,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import React from "react";

import Navigation from "@/comps/Nav/Nav.jsx";

export default function WithSearch(props) {
  return (
    <div>
      <Navigation />
      <Box>{props.children}</Box>
    </div>
  );
}
