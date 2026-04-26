"use client";

import { Box, useTheme } from "@mui/material";

export default function BlogContent({ html }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        lineHeight: 1.8,
        fontSize: "1rem",
        color: "text.primary",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontFamily: theme.typography.fontFamily,
          fontWeight: 600,
          mt: 4,
          mb: 1,
          color: "text.primary",
        },
        "& h1": { fontSize: "2rem" },
        "& h2": { fontSize: "1.5rem" },
        "& h3": { fontSize: "1.25rem" },
        "& p": { mb: 2 },
        "& a": {
          color: "primary.main",
          textDecoration: "underline",
        },
        "& ul, & ol": { pl: 4, mb: 2 },
        "& li": { mb: 0.5 },
        "& blockquote": {
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          pl: 2,
          ml: 0,
          color: "text.secondary",
          fontStyle: "italic",
          my: 2,
        },
        "& code": {
          fontFamily: "monospace",
          fontSize: "0.875em",
          bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
        },
        "& pre": {
          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          overflowX: "auto",
          mb: 2,
          "& code": {
            bgcolor: "transparent",
            px: 0,
            py: 0,
          },
        },
        "& hr": {
          border: "none",
          borderTop: "1px solid",
          borderColor: "divider",
          my: 3,
        },
        "& img": {
          maxWidth: "100%",
          borderRadius: 1,
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          mb: 2,
        },
        "& th, & td": {
          border: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 1,
        },
        "& th": {
          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          fontWeight: 600,
        },
      }}
    />
  );
}
