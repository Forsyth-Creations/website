"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";

import { DarkmodeContext } from "@/contexts/ThemeProvider.jsx";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Hamburger from "@/comps/Nav/Hamburger.jsx";

export default function Navigation() {
  const { isDark } = React.useContext(DarkmodeContext);

  const FullHome = () => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "56px !important",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={FullHome}
        >
          <img
            src={isDark ? "/forsyth/Branding/Name_White.svg" : "/forsyth/Branding/Name_Black.svg"}
            alt="Forsyth Creations"
            style={{ height: 28, width: "auto" }}
          />
        </Box>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <DarkModeSwitch />
          <Hamburger />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export function DarkModeSwitch(props) {
  const { isDark, setIsDark } = React.useContext(DarkmodeContext);

  return (
    <Box sx={props.sx}>
      <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"} placement="bottom">
        <IconButton
          onClick={() => setIsDark(!isDark)}
          size="small"
          sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
