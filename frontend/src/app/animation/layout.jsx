import React from "react";
import { Box } from "@mui/material";
import { DarkModeSwitch } from "@/comps/Nav/Nav";

export default function Layout({ children }) {
  return (
    <Box>
      {/* Dark mode switch in top-right corner */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 5000,
        }}
      >
        <DarkModeSwitch />
      </Box>

      {children}
    </Box>
  );
}
