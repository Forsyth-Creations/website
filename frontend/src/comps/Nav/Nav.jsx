"use client";

import React from "react";

// mui autocomplete
import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

// import the theme provider context
import { DarkmodeContext } from "@/contexts/ThemeProvider.jsx";
import { AutoScrollContext } from "@/contexts/AutoScrollContext.jsx";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Hamburger from "@/comps/Nav/Hamburger.jsx";

export default function Navigation() {
  const { isDark } = React.useContext(DarkmodeContext);
  const { enableAutoScroll, setEnableAutoScroll } =
    React.useContext(AutoScrollContext);

  // scroll to the top of the page
  const FullHome = () => {
    if (window === undefined) return;

    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // This scrolls to the top of the page
    } else {
      window.location.href = "/"; // This navigates to the home page
    }
  };

  return (
    <AppBar sx={{ position: "fixed", top: 0, width: "100%" }} elevation={0}>
      <Toolbar
        id="toolbar_1"
        sx={{
          alignItems: "flex-end",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.default",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <DarkModeSwitch />
          <Tooltip title="Toggle scroll lock" placement="bottom">
            <Switch
              checked={enableAutoScroll}
              onChange={() => setEnableAutoScroll(!enableAutoScroll)}
            />
          </Tooltip>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Stack sx={{ cursor: "pointer", mb : 0 }} onClick={FullHome} alignItems="center">
            {isDark && (
              <img
                src={"/forsyth/Branding/Name_White.svg"}
                alt="Name"
                width={200}
              />
            )}
            {!isDark && (
              <img
                src={"/forsyth/Branding/Name_Black.svg"}
                alt="Name"
                width={200}
              />
            )}
          </Stack>
        <Hamburger/>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export function DarkModeSwitch(props) {
  const { isDark, setIsDark } = React.useContext(DarkmodeContext);

  return (
    <Box sx={props.sx}>
      <Tooltip title="Toggle light/dark theme" placement="bottom">
        <IconButton onClick={() => setIsDark(!isDark)} color="secondary">
          {isDark ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
