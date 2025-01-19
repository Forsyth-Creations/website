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
} from "@mui/material";

// import the theme provider context
import { DarkmodeContext } from "@/contexts/ThemeProvider.jsx";
import { AutoScrollContext } from "@/contexts/AutoScrollContext.jsx";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navigation() {
  const { isDark } = React.useContext(DarkmodeContext);
  const { enableAutoScroll, setEnableAutoScroll } =
    React.useContext(AutoScrollContext);

  // scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // This scrolls to the top of the page
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
        <Box sx={{ cursor: "pointer" }} onClick={scrollToTop}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function DarkModeSwitch(props) {
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
