"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import { toast } from "react-toastify";

const ImageAndDownload = ({ src, alt, width }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{ width: "100%", p: 4 }}
    justifyContent={"center"}
    component={Paper}
    variant="outlined"
  >
    <a href={src} download>
      <img src={src} alt={alt} style={{ width: width }} />
    </a>
  </Stack>
);

const ColorSwatch = ({ colors }) => {
  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    toast.info(`Copied ${color} to clipboard`);
  };

  return (
    <Grid container spacing={2}>
      {colors.map((color) => (
        <Grid item key={color}>
          <Tooltip title={color} arrow>
            <Box
              onClick={() => handleCopy(color)}
              sx={{
                backgroundColor: color,
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></Box>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

const BrandingPage = () => {
  return (
    <WithNav>
      <Container sx={{ pt: "60px" }}>
        <Typography variant="h1" gutterBottom>
          Branding Page
        </Typography>

        <Box component="section" sx={{ marginBottom: "20px" }}>
          <Typography variant="h2" gutterBottom>
            Images
          </Typography>
          <Stack spacing={2}>
            <ImageAndDownload
              src="/forsyth/Branding/Desktops/BlueStandard.png"
              alt="Logo"
              width="100%"
            />
            <ImageAndDownload
              src="/forsyth/Branding/Banner/banner1.png"
              alt="Banner"
              width="100%"
            />
          </Stack>
        </Box>

        <Box component="section">
          <Typography variant="h2" gutterBottom>
            Color Swatches
          </Typography>
          <ColorSwatch
            colors={[
              "#204D71",
              "#3A8DFF",
              "#FFFFFF",
              "#505050",
              "#808080",
              "#F9A825",
            ]}
          />
        </Box>
      </Container>
    </WithNav>
  );
};

export default BrandingPage;
