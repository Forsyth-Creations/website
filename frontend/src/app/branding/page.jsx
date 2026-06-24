"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Button,
  Paper,
  Tooltip,
  Divider,
  Chip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadingIcon from "@mui/icons-material/Downloading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import { brand } from "@/contexts/ThemeProvider.jsx";
import { toast } from "react-toastify";

// Trigger a browser download for a single asset
const downloadAsset = (src) => {
  const link = document.createElement("a");
  link.href = src;
  link.download = src.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// A card showing an asset on a chosen backdrop with a one-click download button
const AssetCard = ({ src, label, note, swatch = "transparent", height = 180 }) => (
  <Paper
    variant="outlined"
    sx={{ display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}
  >
    <Box
      sx={{
        backgroundColor: swatch,
        backgroundImage:
          swatch === "transparent"
            ? "linear-gradient(45deg, rgba(128,128,128,0.12) 25%, transparent 25%), linear-gradient(-45deg, rgba(128,128,128,0.12) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(128,128,128,0.12) 75%), linear-gradient(-45deg, transparent 75%, rgba(128,128,128,0.12) 75%)"
            : "none",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height,
        p: 3,
      }}
    >
      <img
        src={src}
        alt={label}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </Box>
    <Divider />
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      sx={{ p: 1.5 }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h6" noWrap>
          {label}
        </Typography>
        {note && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {note}
          </Typography>
        )}
      </Box>
      <Tooltip title={`Download ${src.split("/").pop()}`} arrow>
        <Button
          size="small"
          variant="contained"
          onClick={() => downloadAsset(src)}
          startIcon={<DownloadIcon />}
        >
          Get
        </Button>
      </Tooltip>
    </Stack>
  </Paper>
);

const ColorSwatch = ({ colors }) => {
  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    toast.info(`Copied ${color} to clipboard`);
  };

  return (
    <Grid container spacing={2}>
      {colors.map(({ hex, name }) => (
        <Grid item xs={6} sm={4} md={3} key={hex}>
          <Paper
            variant="outlined"
            onClick={() => handleCopy(hex)}
            sx={{
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.15s ease",
              "&:hover": { transform: "translateY(-3px)" },
            }}
          >
            <Box sx={{ backgroundColor: hex, height: 90 }} />
            <Divider />
            <Box sx={{ p: 1.5 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">{name}</Typography>
                <ContentCopyIcon fontSize="small" color="disabled" />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {hex.toUpperCase()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const SectionHeading = ({ children, eyebrow }) => (
  <Box sx={{ mb: 3, mt: 6 }}>
    {eyebrow && (
      <Typography
        variant="body2"
        color="primary"
        sx={{ letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}
      >
        {eyebrow}
      </Typography>
    )}
    <Typography variant="h2">{children}</Typography>
  </Box>
);

// Every downloadable file on the page, used by "Download all"
const ALL_ASSETS = [
  "/forsyth/Branding/Logo_White.svg",
  "/forsyth/Branding/Logo_Black.svg",
  "/forsyth/Branding/Name_White.svg",
  "/forsyth/Branding/Name_Black.svg",
  "/forsyth/Branding/lineLogo.png",
  "/forsyth/Branding/g843.png",
  "/forsyth/Branding/Desktops/BlueStandard.png",
  "/forsyth/Branding/Desktops/space1.png",
  "/forsyth/Branding/Desktops/space2.png",
  "/forsyth/Branding/Desktops/Technological.png",
  "/forsyth/Branding/Desktops/desktop_background_peaceful_4k.png",
  "/forsyth/Branding/Desktops/desktop_background_oak_logo_4k.png",
  "/forsyth/Branding/Desktops/stone.png",
  "/forsyth/Branding/Banner/banner1.png",
];

const BrandingPage = () => {
  const downloadAll = () => {
    ALL_ASSETS.forEach((src, i) => {
      // Stagger so the browser doesn't drop concurrent downloads
      setTimeout(() => downloadAsset(src), i * 350);
    });
    toast.success(`Downloading ${ALL_ASSETS.length} assets`);
  };

  return (
    <WithNav>
      <Container sx={{ pt: "60px", pb: "80px" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Forsyth Creations
            </Typography>
            <Typography variant="h1" gutterBottom>
              Brand Kit
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
              Logos, wordmarks, colors, and type for representing the brand
              consistently. Click any asset to download it, or grab the whole set
              at once.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadingIcon />}
            onClick={downloadAll}
            sx={{ flexShrink: 0 }}
          >
            Download All
          </Button>
        </Stack>

        {/* LOGOS */}
        <SectionHeading eyebrow="Marks">Logos</SectionHeading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Use the white mark on dark surfaces and the black mark on light ones.
          Always keep clear space around the logo equal to the height of the
          emblem.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AssetCard
              src="/forsyth/Branding/Logo_White.svg"
              label="Logo — White"
              note="SVG · dark backgrounds"
              swatch={brand[900]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AssetCard
              src="/forsyth/Branding/Logo_Black.svg"
              label="Logo — Black"
              note="SVG · light backgrounds"
              swatch="#ffffff"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AssetCard
              src="/forsyth/Branding/lineLogo.png"
              label="Line Logo"
              note="PNG · outline mark"
              swatch={brand[500]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AssetCard
              src="/forsyth/Branding/g843.png"
              label="Emblem"
              note="PNG · 6145×6145 hi-res"
            />
          </Grid>
        </Grid>

        {/* WORDMARKS */}
        <SectionHeading eyebrow="Type Lockups">Wordmarks</SectionHeading>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AssetCard
              src="/forsyth/Branding/Name_White.svg"
              label="Wordmark — White"
              note="SVG · dark backgrounds"
              swatch={brand[900]}
              height={140}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AssetCard
              src="/forsyth/Branding/Name_Black.svg"
              label="Wordmark — Black"
              note="SVG · light backgrounds"
              swatch="#ffffff"
              height={140}
            />
          </Grid>
        </Grid>

        {/* WALLPAPERS */}
        <SectionHeading eyebrow="For Your Screen">Desktop Wallpapers</SectionHeading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Branded backgrounds for desktop and laptop. Click any to download the
          full-resolution image.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/BlueStandard.png"
              label="Blue Standard"
              note="PNG · classic"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/space1.png"
              label="Space I"
              note="PNG · wallpaper"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/space2.png"
              label="Space II"
              note="PNG · wallpaper"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/Technological.png"
              label="Technological"
              note="PNG · wallpaper"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/desktop_background_peaceful_4k.png"
              label="Peaceful"
              note="PNG · 4K"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/desktop_background_oak_logo_4k.png"
              label="Oak Logo"
              note="PNG · 4K"
              height={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AssetCard
              src="/forsyth/Branding/Desktops/stone.png"
              label="Stone"
              note="PNG · wallpaper"
              height={200}
            />
          </Grid>
        </Grid>

        {/* APPLICATIONS */}
        <SectionHeading eyebrow="In Use">Applications</SectionHeading>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AssetCard
              src="/forsyth/Branding/Banner/banner1.png"
              label="Banner"
              note="PNG · social / header"
              height={260}
            />
          </Grid>
        </Grid>

        {/* COLOR */}
        <SectionHeading eyebrow="Palette">Colors</SectionHeading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Forsyth Blue anchors the palette. Click a swatch to copy its hex value.
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Primary
        </Typography>
        <ColorSwatch
          colors={[
            { hex: brand[300], name: "Sky" },
            { hex: brand[400], name: "Steel" },
            { hex: brand[500], name: "Forsyth Blue" },
            { hex: brand[700], name: "Navy" },
            { hex: brand[900], name: "Midnight" },
          ]}
        />

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Accents
        </Typography>
        <ColorSwatch
          colors={[
            { hex: brand[1100], name: "Spring" },
            { hex: brand[1300], name: "Pine" },
            { hex: brand[1600], name: "Gold" },
            { hex: brand[1700], name: "Amber" },
            { hex: brand[2500], name: "Coral" },
          ]}
        />

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Neutrals
        </Typography>
        <ColorSwatch
          colors={[
            { hex: brand[1900], name: "Cloud" },
            { hex: brand[2000], name: "Mist" },
            { hex: brand[2100], name: "Gray" },
            { hex: brand[2200], name: "Slate" },
            { hex: brand[2300], name: "Charcoal" },
          ]}
        />

        {/* TYPOGRAPHY */}
        <SectionHeading eyebrow="Voice">Typography</SectionHeading>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 4, height: "100%" }}>
              <Chip label="Headings" size="small" sx={{ mb: 2 }} />
              <Typography
                sx={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                Barlow Condensed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Bold, condensed, and uppercase. Used for titles and section
                headings.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 4, height: "100%" }}>
              <Chip label="Body" size="small" sx={{ mb: 2 }} />
              <Typography
                sx={{
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 400,
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                }}
              >
                Barlow keeps body copy clean and legible across the site, from
                paragraphs to UI labels and captions.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Weights 300–600. Use sentence case for readability.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* GUIDELINES */}
        <SectionHeading eyebrow="Do & Don't">Usage Guidelines</SectionHeading>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ p: 3, height: "100%", borderColor: brand[1300] }}
            >
              <Typography variant="h4" sx={{ color: brand[1300], mb: 1.5 }}>
                Do
              </Typography>
              <Stack spacing={1} component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body1">
                  Maintain clear space around the logo.
                </Typography>
                <Typography component="li" variant="body1">
                  Use the white mark on dark, black mark on light.
                </Typography>
                <Typography component="li" variant="body1">
                  Pull colors from the palette above.
                </Typography>
                <Typography component="li" variant="body1">
                  Pair Barlow Condensed headings with Barlow body.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ p: 3, height: "100%", borderColor: brand[2600] }}
            >
              <Typography variant="h4" sx={{ color: brand[2600], mb: 1.5 }}>
                Don&apos;t
              </Typography>
              <Stack spacing={1} component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body1">
                  Stretch, rotate, or recolor the logo.
                </Typography>
                <Typography component="li" variant="body1">
                  Place the mark on a busy or low-contrast background.
                </Typography>
                <Typography component="li" variant="body1">
                  Add drop shadows or outlines to the mark.
                </Typography>
                <Typography component="li" variant="body1">
                  Recreate the wordmark in a different typeface.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </WithNav>
  );
};

export default BrandingPage;
